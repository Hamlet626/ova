'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import FormTitlesUI from "@/components/form_titles_ui";
import { FilesRef, FileRef } from "@/utils/firebase/firebase_client";
import { FileCol } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { useLocalCachePromise, useLastestValue } from "@/utils/server_data_getter/hooks";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Stack, Typography, IconButton, Button, Box } from "@mui/material";
import { getDocs, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { FileColDialog } from "./file_col_dialog";
import { FilesView } from "./files_view";

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

    const editFileCol=(doc:FileCol)=>{
        setData(v=>{
            const edited=v!.findIndex(v=>v.id===doc.id);
            const copy=Array.from(v!);
            copy[edited]=doc;
            return copy;
        });
    }

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
                    <IconButton key={0} {...props} onClick={()=>{setEditColDlgId(v.id)}}><Edit/></IconButton>,
                    <IconButton key={1} {...props} onClick={()=>{setRemoveColDlgId(v.id)}}><Delete/></IconButton>,
                ]
            }))} onClick={(v,i)=>{setSelectedCol(data![i].id!)}}/>
            <Box flexGrow={1}/>
            <Button color="primary" variant='contained' startIcon={<Add/>}
            onClick={()=>setEditColDlgId('')}
            >add collection</Button>
        </Stack>
        <Box width={84}/>
        {selectedColData && <FilesView edid={params.edid} data={selectedColData} onChange={editFileCol}/>}
    </Stack>

    <FileColDialog colID={editColDlgId} close={()=>setEditColDlgId(undefined)}
    initialData={editingData}
    updateLocalFile={(doc: FileCol)=>{
        if(editColDlgId===''){
            setData(v=>[...v??[],doc]);
            setSelectedCol(doc.id!);
        }else{
            editFileCol(doc);
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



