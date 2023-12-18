import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState } from "react";



export type AlertError={
    title?:string,msg:string
};

///wrap callback with loading/error handling.
// pass in the callback for api process
// returns:
//   handleCallAPI:Function wrapping callback with error/loading handling
//   component:ReactNode showing error Alert(automatically handles error showing, if calback returns an AlertError)
//   loading: boolean representing if the callback API is loading
//   setError: Function setter for setting Error (for manually setting error)
export const useAPILoadingError=<T extends any[]>(callback:(...p: T)=>Promise<AlertError|void>,defaultHandleError:boolean=true)=>{
  const [error,setError]=useState<AlertError>();
  const [loading,setLoading]=useState(false);

  return {setError,loading,
      handleCallAPI:async(...p:T)=>{
      setLoading(true);
      const r=await (defaultHandleError? 
          (async()=>{
              try{return await callback(...p)}catch(e){return {msg:`${e}`};}
          })() : callback(...p));
      setLoading(false);
      if(r==null)return true;
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