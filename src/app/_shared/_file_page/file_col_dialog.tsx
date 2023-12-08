import { useAPILoadingError } from "@/components/api_process/use_api_loading_error";
import { FilesRef, FileRef, UserRef } from "@/utils/firebase/firebase_client";
import { FileCol } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { useResettableForm } from "@/utils/hooks/use_resettable_form";
import { useLastestValue } from "@/utils/hooks/use_latest_value";
import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogTitle, DialogContent, Stack, TextField, DialogActions, Button } from "@mui/material";
import { addDoc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { FilesInfoContext, userFileInfo } from "./files";

export const FileColDialog=({colID,close,initialData,updateLocalFile,edid}:
    {colID?:string,close:()=>void,initialData?:FileCol, updateLocalFile:(doc:FileCol)=>void,edid:string})=>{
        
    const owner=(useContext(FilesInfoContext) as userFileInfo).user;
        /// useLastestValue to avoid colID became undefined when closing, and renders Edit title
        const isCreate=useLastestValue(colID)==='';
        const me=useSession({required:true}).data?.user!;
        const{loading,setError,handleCallAPI,errNotiComponent}=useAPILoadingError(async(data)=>{
            if(isCreate){
                const r=await addDoc(FilesRef(owner.role,edid),{...data,by:UserRef(me.role,me.id)});
                updateLocalFile({...data,id:r.id,files:{}});
            }else{
                await setDoc(FileRef(owner.role,edid,colID!),data,{merge:true});
                updateLocalFile({...initialData,...data});
            }
        });

        const {register,handleSubmit}=useResettableForm({defaultValues:initialData, shouldUnregister:true});

    return <>
    <Dialog open={colID!=null} onClose={()=>close()}>
        <DialogTitle>{isCreate?'New Files Collection':'Edit Collection'}</DialogTitle>
        <DialogContent>
          <form>
            <Stack spacing={2}>
                <TextField variant='standard' {...register('name',{required:true})} placeholder="Collection Name"/>
                <TextField variant='standard' multiline {...register('description')} placeholder="descriptions..."/>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>close()}>Cancel</Button>
          <LoadingButton loading={loading} variant='contained' onClick={handleSubmit(async(data)=>{
                const success=await handleCallAPI(data);
                if(success)return close();
            })
        }>{isCreate?'create':'save'}</LoadingButton>
        </DialogActions>
    </Dialog>
    {errNotiComponent}
    </>
}