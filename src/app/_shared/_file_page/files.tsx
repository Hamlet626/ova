'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import FormTitlesUI from "@/components/form_titles_ui";
import { FilesRef, FileRef } from "@/utils/firebase/firebase_client";
import { FileCol } from "@/utils/firebase/types";
import { RoleNum } from "@/utils/roles";
import { useLastestValue } from "@/utils/hooks/use_latest_value";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Stack, Typography, IconButton, Button, Box, Paper } from "@mui/material";
import { getDocs, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { FileColDialog } from "./file_col_dialog";
import { FilesView } from "./files_view";
import { ListPageLayout } from "@/components/layouts/list_page_layout";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { useCachedPromise } from "@/utils/hooks/use_cached_promise";

export type userFileInfo={user:{role:RoleNum,id:string}}&{pageView:boolean}
export type caseFileInfo={case:string}&{pageView:boolean}
export const FilesInfoContext = createContext<userFileInfo|caseFileInfo|{}>({});

export default function FilesPage(){

    const infoData=useContext(FilesInfoContext) as userFileInfo;
    const owner=infoData.user;
    const [selectedCol,setSelectedCol]=useState('');
    const {data,setData,error}=useCachedPromise(()=>{
        return getDocs(FilesRef(owner.role,owner.id)).then(v=>{
            if(!v.empty)setSelectedCol(v.docs[0].id);
            return v.docs.map(v=>({...v.data(),id:v.id} as FileCol));
        });
    },[owner.id],[]);
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

    const titleColumn=<Stack>
        {infoData.pageView && [
        <Typography sx={PageHeader}>My Files</Typography>,
        <Box height={22}/>]}
    <Typography variant="subtitle2">Collections</Typography>
    {error && Object.keys(error).length>0 && <Typography>{JSON.stringify(error)}</Typography>}
    <Box height={16}/>
    <FormTitlesUI titles={data!.map(v=>({
        title:v.name,
        selected:v.id===selectedCol,
        actions:(props)=>[
            <IconButton key={0} {...props} onClick={(ev)=>{
                ev.stopPropagation();
                setEditColDlgId(v.id)}}><Edit/></IconButton>,
            <IconButton key={1} {...props} onClick={(ev)=>{
                ev.stopPropagation();
                setRemoveColDlgId(v.id)}}><Delete/></IconButton>,
        ]
    }))} onClick={(v,i)=>{setSelectedCol(data![i].id!)}}/>
    {!infoData.pageView && <Box flexGrow={1}/>}
    <Button color="primary" variant='contained' startIcon={<Add/>}
    onClick={()=>setEditColDlgId('')}
    >add collection</Button>
</Stack>;

    return <>
    {infoData.pageView?<ListPageLayout listChildren={titleColumn}>
        {selectedColData && <FilesView edid={owner.id} data={selectedColData} onChange={editFileCol}/>}
    </ListPageLayout>:
    <Stack direction={'row'} minHeight={'calc(100vh - 450px)'}>
        {titleColumn}
        <Box width={84}/>
        {selectedColData && <FilesView edid={owner.id} data={selectedColData} onChange={editFileCol}/>}
    </Stack>}

    <FileColDialog colID={editColDlgId} close={()=>setEditColDlgId(undefined)}
    initialData={editingData}
    updateLocalFile={(doc: FileCol)=>{
        if(editColDlgId===''){
            setData(v=>[...v??[],doc]);
            setSelectedCol(doc.id!);
        }else{
            editFileCol(doc);
        }
        }} edid={owner.id}/>

    <ConfirmDialog open={removeColDlgId!=null} close={()=>setRemoveColDlgId(undefined)} 
        title={`Remove Collection ${stableRmData?.name}`}
        content={`Please confirm to remove File Collection ${stableRmData?.name}? Files shared with other collections will NOT be affected.`}
        onConfirm={async()=>{
            await deleteDoc(FileRef(owner.role,owner.id,removeColDlgId!));
            const deleted=data!.filter(v=>v.id!==removeColDlgId);
            setData(deleted);
            if(selectedCol===removeColDlgId)setSelectedCol(deleted![0].id??'');
        }}/>
    </>;
}



