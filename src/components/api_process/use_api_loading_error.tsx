import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";



export type AlertError={
    title?:string,msg:string
};

/**  wrap callback with loading/error handling.
 * pass in the callback for api process
 * returns:
 * handleCallAPI:Function wrapping callback with error/loading handling
 * errNotiComponent:ReactNode showing error Alert(automatically handles error showing, if calback returns an AlertError)
 * loading: boolean representing if the callback API is loading
 * setError: Function setter for setting Error (for manually setting error)
 */


export const useAPILoadingError=<T extends any[]>(callback:(...p: T)=>Promise<AlertError|void>,
options:{defaultHandleError?:boolean,successKeepLoading?:boolean}={defaultHandleError:true,successKeepLoading:false}):
{setError: Dispatch<SetStateAction<AlertError | undefined>>,
    loading: any,setLoading: Dispatch<SetStateAction<boolean>>,
    handleCallAPI: (...p:T)=>Promise<boolean>,
    errNotiComponent: ReactNode}=>{
  const [error,setError]=useState<AlertError>();
  const [loading,setLoading]=useState(false);

  return {setError,loading,setLoading,
    handleCallAPI:async(...p:T)=>{
    setLoading(true);
    const r=await (options.defaultHandleError? 
        (async()=>{
            try{
                return await callback(...p)
            }catch(e){
                console.log(e);
                return {msg:`${e}`};}
        })() : callback(...p));
    if(r==null){
        if(!!!options.successKeepLoading)setLoading(false);
        return true;
    }
    setLoading(false);
    setError(r);
    return false;
  },
      errNotiComponent:(<Snackbar open={error!=null} autoHideDuration={6000} onClose={()=>setError(undefined)}>
      <Alert onClose={()=>setError(undefined)} severity='error' sx={{ width: '100%' }}>
          {error?.title && <AlertTitle>{error.title}</AlertTitle>}
          {error?.msg}
          </Alert>
          </Snackbar>)
          };
}