'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { PopupComp } from "@/components/popup_comp";
import { EDListRef } from "@/utils/firebase/firebase_client";
import { EDList } from "@/utils/firebase/types";
import { roles, RoleNum } from "@/utils/roles";
import { MoreHoriz, Edit, Delete } from "@mui/icons-material";
import { Stack, Typography, IconButton, MenuItem, Box } from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import router from "next/router";
import { useState, MouseEventHandler } from "react";
import { RemainedSlider } from "../../ed/[agcid]/forms/remained_slider";
import { EdFbTile } from "@/app/_shared/_ed/_ed_tiles/fb_tile";

export const EDListPreview=({data,uid}:{data:EDList,uid:string})=>{

    const [confirmDelete,setConfirmDelete]=useState(false);
    
    return <>
    <Stack>
        <Stack direction={'row'}>
            <Typography variant="subtitle2">{data.name}</Typography>
            <Box flexGrow={1}/>
            <PopupComp 
            compBuilder={(onClick: MouseEventHandler<HTMLButtonElement>)=> 
            <IconButton onClick={onClick}><MoreHoriz /></IconButton> } 
            menuBuilder={(onClose: Function)=> <>
            <MenuItem divider onClick={()=>{}}><Edit/>Edit</MenuItem>
            <MenuItem color="warning" onClick={()=>setConfirmDelete(true)}><Delete/>Remove List</MenuItem>
            </> }/>
        </Stack>
        <RemainedSlider>
            {data.eds.map(v=><RemovableEDTile edid={v}/>)}
        </RemainedSlider>
    </Stack>
    <ConfirmDialog open={confirmDelete} close={()=>setConfirmDelete(false)} 
        // title={`Remove Collection ${data.name}`}
        content={`Please confirm to delete ${data?.name}?`}
        onConfirm={async()=>{
            await deleteDoc(EDListRef(uid,data.id!));
            router.replace(`${roles[RoleNum.Rcp].path}/lists`);
        }}/>
    </>
}

const RemovableEDTile=({edid}:{edid:string})=>{
    return <EdFbTile edid={edid}/>;
}