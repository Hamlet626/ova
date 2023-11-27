import { processCldUrl } from "@/utils/cloudinary/utils";
import { FileRef } from "@/utils/firebase/firebase_client";
import { FileCol, FileData, urlToFieldKey } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { AddAPhoto } from "@mui/icons-material";
import { Stack, Typography, ButtonBase, FormControlLabel, Checkbox, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { updateDoc, deleteField } from "firebase/firestore";
import { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { CreateFileDialog } from "./create_file_dialog";
import { EditFileDialog } from "./edit_file_dialog";
import { FileTile } from "./file_tile";

export const FilesView=({data,onChange,edid}:{data:FileCol,onChange:(v:FileCol)=>void,edid:string})=>{

    const [editingFile,setEditFile]=useState<FileData>();

    const [selectedFile,setFile]=useState<File>();
    const onDrop=(acceptedFiles: File[],fileRejections: FileRejection[])=>{
        if(acceptedFiles.length>0)setFile(acceptedFiles[0]);
    };
    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({noClick:true,onDrop,maxFiles:1});

    const files=Object.entries(data.files).sort((a,b)=>{
        const fileA=processCldUrl(a[0],a[1].name).fileName;
        const fileB=processCldUrl(b[0],b[1].name).fileName;
        return fileA>fileB?1:fileA===fileB?0:-1;
    }).map((v)=>({...v[1],url:v[0]}));

    const fileDataToDoc=(v:FileData)=>{
        const {url:url,...doc}=v;
        return {[v.url!]:doc};
    };

    return <Stack flexGrow={1}>
        <Stack direction={'row'} alignItems={'center'}>
            <Typography variant="subtitle1">{data.name}</Typography>
            <Box flexGrow={1}/>
            <Typography variant="body2">Total: {files.length} file{files.length>1?'s':''}</Typography>
        </Stack>
        <Box height={20}/>
        <Grid2 container overflow='auto' columnSpacing={3} rowSpacing={2} {...getRootProps()} flexGrow={1}>
            {files.map(v=>(<Grid2 xs width={134} maxWidth={134}>
                <FileTile data={v} openEditDlg={()=>setEditFile(v)}/>
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
        <Grid2 container>
        <FormControlLabel 
        control={<Checkbox value={data.selfEditable}/>}
        label={'self editable'}
        checked={data.selfEditable??false}
        onChange={(ev,v)=>{
            onChange({...data,selfEditable:v});
            updateDoc(FileRef(RoleNum.ED,edid,data.id!),{selfEditable:v});
        }}
        />
        </Grid2>
        <CreateFileDialog close={()=>setFile(undefined)} data={selectedFile}
        updateData={async(newFile:FileData)=>{
            // const i=data.files.findIndex(v=>v.)
            const newDoc=fileDataToDoc(newFile);
            await updateDoc(FileRef(RoleNum.ED,edid,data.id!),
            {[`files.${urlToFieldKey(newFile.url!)}`]:newDoc[newFile.url!]});
            onChange({...data,files:{...data.files,...newDoc}});
        }}/>
        <EditFileDialog close={()=>setEditFile(undefined)} data={editingFile}
        removeData={async()=>{
            await updateDoc(FileRef(RoleNum.ED,edid,data.id!),
            {[`files.${urlToFieldKey(editingFile!.url!)}`]:deleteField()});
            const {[editingFile!.url!]:xx,...otherFiles}=data.files;
            onChange({...data,files:otherFiles});
        }} 
        updateData={async(update)=>{
            await updateDoc(FileRef(RoleNum.ED,edid,data.id!),
            Object.fromEntries(Object.entries(update).map(
                et=>[`files.${urlToFieldKey(editingFile!.url!)}.${et[0]}`,et[1]])) as any
            );
            const {[editingFile!.url!]:edited,...otherFiles}=data.files;
            onChange({...data,files:{
                ...otherFiles,
                [editingFile!.url!]:{...edited,...update}
            }});
        }}/>
    </Stack>
}