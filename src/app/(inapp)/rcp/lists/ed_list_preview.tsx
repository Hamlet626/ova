'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { PopupComp } from "@/components/popup_comp";
import { EDListRef } from "@/utils/firebase/firebase_client";
import { EDList } from "@/utils/firebase/types";
import { roles, RoleNum } from "@/utils/roles";
import { MoreHoriz, Edit, Delete, Cancel, CancelOutlined } from "@mui/icons-material";
import { Stack, Typography, IconButton, MenuItem, Box } from "@mui/material";
import { arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, MouseEventHandler } from "react";
import { RemainedSlider } from "../../ed/[agcid]/forms/remained_slider";
import { EdFbTile } from "@/app/_shared/_ed/_ed_tiles/fb_tile";
import { useAPILoadingError } from "@/components/api_process/use_api_loading_error";
import { refresh_server } from "@/utils/server_data_getter/utils";

export const EDListPreview=({data,uid}:{data:EDList,uid:string})=>{

    const router=useRouter();
    const [confirmDelete,setConfirmDelete]=useState(false);
    const [eds,setEds]=useState(data.eds);
    const {handleCallAPI,errNotiComponent}=useAPILoadingError(async(edid:String)=>{
        await updateDoc(EDListRef(uid,data.id!),{eds:arrayRemove(edid)});
    })
    
    return <>
    <Stack>
        <Stack direction={'row'}>
            <Typography variant="subtitle2">{data.id==='like'?'Liked':data.name}</Typography>
            <Box flexGrow={1}/>
            {data.id!=='like'&&<IconButton onClick={()=>setConfirmDelete(true)}><Delete/></IconButton>}
        </Stack>
        <Box height={12}/>
        <RemainedSlider>
            {eds.map(v=><RemovableEDTile key={v} edid={v} 
            onRemove={async()=> {
                const r=await handleCallAPI(v);
                if(r)setEds(eds.filter(ed=>ed!==v));
            } }/>)}
        </RemainedSlider>
    </Stack>
    <ConfirmDialog open={confirmDelete} close={()=>setConfirmDelete(false)} 
        // title={`Remove Collection ${data.name}`}
        content={`Please confirm to delete ${data?.name}?`}
        onConfirm={async()=>{
            await deleteDoc(EDListRef(uid,data.id!));
            refresh_server('ed_lists_data');
            // router.replace(`${roles[RoleNum.Rcp].path}/lists`);
        }}/>
        {errNotiComponent}
    </>
}

const RemovableEDTile=({edid,onRemove}:{edid:string,onRemove:()=>void})=>{
    return <Box position={'relative'} sx={{'&:hover .hidden': {
        display:'block',
      }}}>
        <EdFbTile edid={edid} constraint={{padding:104}}/>
        <IconButton className="hidden" sx={{display:'none', position:'absolute', top:-20, right:-20}} disableRipple
        onClick={onRemove}
        ><Cancel/></IconButton>
        {/* <IconButton></IconButton> */}
        </Box>;
}