'use client'
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { PopupComp } from "@/components/popup_comp";
import { EDListRef } from "@/utils/firebase/firebase_client";
import { EDList } from "@/utils/firebase/types";
import { roles, RoleNum } from "@/utils/roles";
import { MoreHoriz, Edit, Delete, Create } from "@mui/icons-material";
import { Stack, Typography, IconButton, MenuItem, Box, Button } from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import router from "next/router";
import { useState, MouseEventHandler } from "react";
import { RemainedSlider } from "../../ed/[agcid]/forms/remained_slider";
import { EdFbTile } from "@/app/_shared/_ed/_ed_tiles/fb_tile";

export const EDListCreater=({uid}:{uid:string})=>{

    const [confirmDelete,setConfirmDelete]=useState(false);
    
    return <>
    <Button variant="contained" color="primary" startIcon={<Create/>}>Create New List</Button>
    {/* <ConfirmDialog open={confirmDelete} close={()=>setConfirmDelete(false)} 
        // title={`Remove Collection ${data.name}`}
        content={`Please confirm to delete ${data?.name}?`}
        onConfirm={async()=>{
            await deleteDoc(EDListRef(uid,data.id!));
            router.replace(`${roles[RoleNum.Rcp].path}/lists`);
        }}/> */}
    </>
}
