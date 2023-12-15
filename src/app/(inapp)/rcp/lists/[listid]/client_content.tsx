'use client'
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { EDListRef, FileRef } from "@/utils/firebase/firebase_client";
import { EDListDoc } from "@/utils/firebase/path";
import { EDList } from "@/utils/firebase/types";
import { RoleNum, roles } from "@/utils/roles";
import { Cancel, Check, CheckCircle, Delete, Edit } from "@mui/icons-material";
import { Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const EDListClientContent=({initialData,uid}:{initialData:EDList,uid:string})=>{
    const router=useRouter();
    const [data,setData]=useState(initialData);
    const [confirmDelete,setConfirmDelete]=useState(false);
    const [editedName,setEditedName]=useState<string|undefined>();

    return (<>
    <Stack>
        <Stack direction={'row'}>
            {editedName==null?[
                <Typography sx={PageHeader}>{data.name}</Typography>,
                <IconButton disableRipple color="secondary" onClick={()=>setEditedName(data.name)}><Edit/></IconButton>,
                <IconButton disableRipple color="warning" onClick={()=>setConfirmDelete(true)}><Delete/></IconButton>,
            ]:[
                    <TextField value={editedName} onChange={(ev)=>setEditedName(ev.target.value)} variant="standard"/>,
                    <IconButton disableRipple color="secondary" 
                    disabled={editedName.trim().length===0}
                    onClick={()=>{
                        setData({...data,name:editedName.trim()});
                        updateDoc(EDListRef(uid,data.id!),{name:editedName.trim()});
                        setEditedName(undefined);
                    }}
                    ><CheckCircle/></IconButton>,
                    <IconButton disableRipple color="secondary" onClick={()=>setEditedName(undefined)}><Cancel/></IconButton>
                ]
        }
        </Stack>

        <FormControlLabel control={<Checkbox value={data.public}/>}
        label={'share with clinic'} checked={data.public??false}
        onChange={(ev,v)=>{
            setData({...data,public:v});
            updateDoc(EDListRef(uid,data.id!),{public:v});
        }}
        />
    </Stack>
    <ConfirmDialog open={confirmDelete} close={()=>setConfirmDelete(false)} 
        // title={`Remove Collection ${data.name}`}
        content={`Please confirm to delete ${data?.name}?`}
        onConfirm={async()=>{
            await deleteDoc(EDListRef(uid,data.id!));
            router.replace(`${roles[RoleNum.Rcp].path}/lists`);
        }}/>
    </>);
}