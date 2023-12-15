import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { AlertError, useAPILoadingError } from "./use_api_loading_error";

export const ConfirmDialog=({open,close,onConfirm,title,content}:
    {open:boolean,close:()=>void,onConfirm:()=>Promise<AlertError|void>,title?:string,content:string})=>{
        // const [error,setError]=useState<AlertError>();
        // const [loading,setLoading]=useState(false);

        const{loading,setError,handleCallAPI,errNotiComponent}=useAPILoadingError(onConfirm);

    return <>
    <Dialog open={open} onClose={()=>close()}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>close()}>Cancel</Button>
          <LoadingButton loading={loading} variant='contained' onClick={async()=>{
            const r=await handleCallAPI();
            if(r)return close();
        }}>confirm</LoadingButton>
        </DialogActions>
    </Dialog>
    {errNotiComponent}
    </>
}