'use client'
import FormTitlesUI from "@/components/form_titles_ui";
import { FileRef, FilesRef, UserRef } from "@/utils/firebase/firebase_client";
import { FileCol } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { useLocalCachePromise } from "@/utils/server_data_getter/hooks";
import { getBasicFbData } from "@/utils/server_data_getter/utils";
import { Add, Delete, Edit } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DocumentSnapshot, QueryDocumentSnapshot, addDoc, deleteDoc, getDocs, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export default function Files({params}:{params: { edid: string }}){

    const [selectedCol,setSelectedCol]=useState('');
    const {data,setData,error}=useLocalCachePromise(()=>{
        return getDocs(FilesRef(RoleNum.ED,params.edid)).then(v=>{
            if(!v.empty)setSelectedCol(v.docs[0].id);
            return v.docs.map(v=>({...v.data(),id:v.id} as FileCol));
        });
    },[params.edid],[]);
    const [editColDlgId,setEditColDlgId]=useState<string>();
    const [removeColDlgId,setRemoveColDlgId]=useState<string>();
    
    return <>
    <Stack direction={'row'}>
        <Stack>
            <Typography variant="subtitle2">Collections</Typography>
            {error && <Typography>{JSON.stringify(error)}</Typography>}
            <FormTitlesUI titles={data!.map(v=>({
                title:v.name,
                selected:v.id===selectedCol,
                actions:(props)=>[
                    <IconButton {...props} onClick={()=>{setEditColDlgId(v.id)}}><Edit/></IconButton>,
                    <IconButton {...props} onClick={()=>{setRemoveColDlgId(v.id)}}><Delete/></IconButton>,
                ]
            }))} onClick={(v,i)=>{setSelectedCol(data![i].id!)}}/>
            <Button color="primary" variant='contained' startIcon={<Add/>}
            onClick={()=>setEditColDlgId('')}
            >add collection</Button>
        </Stack>
    </Stack>

    <FileColDialog colID={editColDlgId} close={setEditColDlgId}
    initialData={data?.find(v=>v.id===editColDlgId)}
    addLocalFile={(doc: FileCol)=>{
        if(editColDlgId===''){
            setData(v=>[...v??[],doc]);
            setSelectedCol(doc.id!);
        }else{
            setData(v=>{
                const edited=v!.findIndex(v=>v.id===doc.id);
                const copy=Array.from(v!);
                copy[edited]=doc;
                return copy;
            })
        }
        }} edid={params.edid}/>

    <ConfirmDialog open={removeColDlgId!=null} close={setRemoveColDlgId} 
        title="Remove Collection" content="Please confirm"
        onConfirm={async()=>{
            await deleteDoc(FileRef(RoleNum.ED,params.edid,removeColDlgId!));
            const deleted=data!.filter(v=>v.id!==removeColDlgId);
            setData(deleted);
            if(selectedCol===removeColDlgId)setSelectedCol(deleted![0].id??'');
        }}/>
    </>;
}



export type AlertError={
    title?:string,msg:string
};
export const ConfirmDialog=({open,close,onConfirm,title,content}:
    {open:boolean,close:Function,onConfirm:()=>Promise<AlertError|void>,title:string,content:string})=>{
        // const [error,setError]=useState<AlertError>();
        // const [loading,setLoading]=useState(false);

        const{loading,setError,handleCallAPI,errNotiComponent}=useAPILoadingError(onConfirm);

    return <>
    <Dialog open={open} onClose={()=>close()}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
          {/* {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
</Snackbar>} */}
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

///wrap callback with loading/error handling.
// pass in the callback for api process
// returns:
//   handleCallAPI:Function wrapping callback with error/loading handling
//   component:ReactNode showing error Alert(automatically handles error showing, if calback returns an AlertError)
//   loading: boolean representing if the callback API is loading
//   setError: Function setter for setting Error (for manually setting error)
const useAPILoadingError=<T extends any[]>(callback:(...p: T)=>Promise<AlertError|void>,defaultHandleError:boolean=true)=>{
    const [error,setError]=useState<AlertError>();
    const [loading,setLoading]=useState(false);

    return {setError,loading,
        handleCallAPI:async(...p:T)=>{
            console.log('test here');
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

export const FileColDialog=({colID,close,initialData,addLocalFile,edid}:
    {colID?:string,close:Function,initialData?:FileCol,
        addLocalFile:(doc:FileCol)=>void,
        edid:string})=>{

        const me=useSession({required:true}).data?.user!;
        const{loading,setError,handleCallAPI,errNotiComponent}=useAPILoadingError(async(data)=>{
            console.log(data);
            if(colID===''){
                const r=await addDoc(FilesRef(RoleNum.ED,edid),{...data,by:UserRef(me.role,me.id)});
                addLocalFile({...data,id:r.id});
            }else{
                await setDoc(FileRef(RoleNum.ED,edid,colID!),data,{merge:true});
                addLocalFile({...data,id:colID});
            }
        });

        const {register,handleSubmit}=useForm({defaultValues:initialData});

    return <>
    <Dialog open={colID!=null} onClose={()=>close()}>
        <DialogTitle>New Files Collection</DialogTitle>
        <DialogContent>
          <form>
            <TextField variant='standard' {...register('name',{required:true})}/>
            <TextField variant='standard' multiline {...register('description')}/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>close()}>Cancel</Button>
          <LoadingButton loading={loading} variant='contained' onClick={handleSubmit(async(data)=>{
                const success=await handleCallAPI(data);
                if(success)return close();
            })
        }>create</LoadingButton>
        </DialogActions>
    </Dialog>
    {errNotiComponent}
    </>
}