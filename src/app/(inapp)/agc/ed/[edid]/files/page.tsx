'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import FormTitlesUI from "@/components/form_titles_ui";
import { FileRef, FilesRef } from "@/utils/firebase/firebase_client";
import { FileCol, FileData } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { useLastestValue, useLocalCachePromise } from "@/utils/server_data_getter/hooks";
import { Add, AddAPhoto, Delete, Edit } from "@mui/icons-material";
import { Box, Button, ButtonBase, Card, CardActionArea, CardMedia, Dialog, DialogContent, IconButton, Stack, Typography, styled } from "@mui/material";
import { deleteDoc, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { FileColDialog } from "./file_col_dialog";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import usePromise from "react-use-promise";
import cloudinary from "@/utils/cloudinary";
import {FileRejection, useDropzone} from 'react-dropzone'
import { useAPILoadingError } from "@/components/api_process/use_api_loading_error";

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
    
    const removingData=data?.find(v=>v.id===removeColDlgId);
    const editingData=data?.find(v=>v.id===editColDlgId);
    const stableRmData=useLastestValue(removingData);

    const selectedColData=data?.find(v=>v.id===selectedCol);
    return <>
    <Stack direction={'row'} minHeight={'calc(100vh - 450px)'}
    >
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
            <Box flexGrow={1}/>
            <Button color="primary" variant='contained' startIcon={<Add/>}
            onClick={()=>setEditColDlgId('')}
            >add collection</Button>
        </Stack>
        {selectedColData && <FilesView data={selectedColData}/>}
    </Stack>

    <FileColDialog colID={editColDlgId} close={()=>setEditColDlgId(undefined)}
    initialData={editingData}
    updateLocalFile={(doc: FileCol)=>{
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

    <ConfirmDialog open={removeColDlgId!=null} close={()=>setRemoveColDlgId(undefined)} 
        title={`Remove Collection ${stableRmData?.name}`} 
        content={`Please confirm to remove File Collection ${stableRmData?.name}? Files shared with other collections will NOT be affected.`}
        onConfirm={async()=>{
            await deleteDoc(FileRef(RoleNum.ED,params.edid,removeColDlgId!));
            const deleted=data!.filter(v=>v.id!==removeColDlgId);
            setData(deleted);
            if(selectedCol===removeColDlgId)setSelectedCol(deleted![0].id??'');
        }}/>
    </>;
}


export const FilesView=({data}:{data:FileCol})=>{
    const [selectedFile,setFile]=useState<File>();
    const onDrop=(acceptedFiles: File[],fileRejections: FileRejection[])=>{
        if(acceptedFiles.length>0)setFile(acceptedFiles[0]);
    };
    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({noClick:true,onDrop,maxFiles:1});
    // const {ref, ...rootProps} = getRootProps()

    return <Stack flexGrow={1}>
        <Stack direction={'row'} alignItems={'center'}>
            <Typography variant="subtitle1">{data.name}</Typography>
            <Box flexGrow={1}/>
            <Typography variant="body2">Total: {data.files.length} file{data.files.length>1?'s':''}</Typography>
        </Stack>
        <Grid2 container overflow='auto' {...getRootProps()} flexGrow={1}>
            {data.files.map(v=>(<Grid2 xs width={134}>
                <FileTile data={v}/>
            </Grid2>))}
            <input {...getInputProps()}/>
            <Grid2 xs width={134}>
                <ButtonBase sx={{ p: 2, border: '1px dashed grey' }} onClick={open}>
                {/* <Box sx={{ p: 2, border: '1px dashed grey' }}> */}
                    <AddAPhoto/>
                {/* </Box> */}
                </ButtonBase>
            </Grid2>
        </Grid2>
        <CreateFileDialog open={selectedFile!=null} close={()=>setFile(undefined)} data={selectedFile}/>
    </Stack>
}


export const FileTile=({data}:{data:FileData})=>{
    // const [fileData]=usePromise(async()=>{
    //     const r=await cloudinary.api.resource(data.url);
    //     return r;
    // },[data.url]);

    return <Card>
        {/* <CardActionArea>
            <CardMedia src="" />
        </CardActionArea>
        <Typography></Typography> */}
    </Card>
}


  
export const CreateFileDialog=({open,close,data}:{open:boolean,close:()=>void,data?:File})=>{

    const {loading,handleCallAPI,errNotiComponent}=useAPILoadingError(async(file)=>{
        const formData = new FormData();
            //   fetch('https://api.cloudinary.com/v1_1/hzxyensd5/image/upload')
              formData.append("file", file);
              formData.append("upload_preset", "public-files");

              await fetch('https://api.cloudinary.com/v1_1/pc-ova/image/upload', {
                method: "POST",
                body: formData
            })
            .then(async(response) => {
                console.log(await response.text());
                return response.text();
            })
    })

    const fileData=useLastestValue(data);

    // console.log(URL.createObjectURL(fileData))
    return <>
    <Dialog open={open} onClose={()=>{
        close();
    }}>
        <DialogContent>
            <Stack>
                <Card sx={{width:300,height:300}}>
                    {fileData && <CardMedia src={URL.createObjectURL(fileData)} component={'picture'}
                    sx={{width:300,height:300}}
                    />}
                    </Card>
                    {fileData && <img src={URL.createObjectURL(fileData)}/>}
            </Stack>
            </DialogContent>
    </Dialog>
    {errNotiComponent}
    </>;
}