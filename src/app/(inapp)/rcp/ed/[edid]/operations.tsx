'use client'
import { nameLabel } from "@/components/ThemeRegistry/theme_consts"
import { useAPILoadingError } from "@/components/api_process/use_api_loading_error"
import { CheckboxField } from "@/components/form_fields/check_box_field"
import { FieldDialog } from "@/components/layouts/field_dialog"
import { PopupComp } from "@/components/popup_comp"
import { EDListRef, EDListsRef } from "@/utils/firebase/firebase_client"
import { EDList } from "@/utils/firebase/types"
import { usePromiseState } from "@/utils/hooks/use_promise_state"
import { useResettableForm } from "@/utils/hooks/use_resettable_form"
import { getEDListsData_client } from "@/utils/server_data_getter/client_getter"
import { Add, ArrowDropUp, Create, Favorite, FavoriteBorder, PlaylistAdd } from "@mui/icons-material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Paper, Stack, Button, Box, MenuItem, ListItemButton, Checkbox, ListItemIcon, ListItemText, Typography, TextField, IconButton, Dialog, DialogTitle, DialogContent, List } from "@mui/material"
import { addDoc, arrayRemove, arrayUnion, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { MouseEventHandler, ReactNode, useEffect, useState } from "react"
import usePromise from "react-use-promise"

export const EDRcpOperations=({edid}:{edid:string})=>{
    return <Paper sx={(theme)=>({borderRadius:0, zIndex:theme.zIndex.appBar,
        pl:4,pr:3,height:80, display:'flex',alignItems:'center', gap:'10px'})} elevation={12}>
        <EDListMenu edid={edid}/>

        <Box flexGrow={1}/>
        <Button variant="outlined" color="secondary">Reserve</Button>
        <Button variant="contained" color="primary">Request Match</Button>
</Paper>
}

export const EDListMenu=({edid,}:{edid:string,})=>{
    const myid=useSession({required:true}).data?.user?.id!;
    const [listDlgOpen,setListDlgOpen]=useState(false);
    const [creating,setCreating]=useState(false);

    const {data,setData,status,error}=usePromiseState(async()=>{
        const r = await getDocs(EDListsRef(myid));
        const processed = r.docs.map(v=>({name:v.data().name,id:v.id,contain:v.data().eds.includes(edid)}));

        ///add liked doc data to State, (may or may not exist on firebase)
        if(processed.every(v=>v.id!=='like'))return [...processed,{id:'like',name:'like',contain:false}];
        return processed;
    },[myid]);

    const liked=data?.filter(v=>v.id==='like')[0].contain==true;
    const {handleSubmit,register,control,reset}=useResettableForm();
    const {errNotiComponent,loading,handleCallAPI}=useAPILoadingError(async(newList)=>{
        const r=await addDoc(EDListsRef(myid),{...newList,eds:[edid]});
        setData([...data!,{id:r.id,name:newList.name,contain:true}]);
    });

    console.log(data,error);
    useEffect(()=>{
        if(listDlgOpen)setCreating(false);
    },[listDlgOpen]);
    
    return <>
    <Button variant="outlined" color="secondary" 
    startIcon={liked?<Favorite />:<FavoriteBorder />}
    onClick={()=>{
        setData(Array.from(data!).map(v=>v.id==='like'?{...v,contain:!liked}:v));
        setDoc(EDListRef(myid,'like'),{eds:liked?arrayRemove(edid):arrayUnion(edid)},{merge:true});
    }}
    >
        Like
        </Button>
    <Button variant="outlined" color="secondary" onClick={()=>setListDlgOpen(true)}
    startIcon={<PlaylistAdd/>} endIcon={<ArrowDropUp/>}>Save To List</Button>
    
    <FieldDialog open={listDlgOpen} onClose={()=>setListDlgOpen(false)}>
        <DialogTitle>Save Egg Donor to</DialogTitle>
        <DialogContent>
            <List dense disablePadding>
        {error && <Typography>{`${error}`}</Typography>}
    {data?.filter(v=>v.id!=='like')?.map(v=>(<ListItemButton onClick={(ev)=>{
        setData(Array.from(data).map(edl=>({...edl,contain:v.id===edl.id?!edl.contain:edl.contain})));
        updateDoc(EDListRef(myid,v.id),{eds:v.contain?arrayRemove(edid):arrayUnion(edid)});
    }}>
        <ListItemIcon>
            <Checkbox edge="start" checked={v.contain} tabIndex={-1} disableRipple/>
        </ListItemIcon>
        <ListItemText>
            {v.name}
        </ListItemText>
    </ListItemButton>))}
    {!creating?<ListItemButton onClick={(ev)=>{
        setCreating(true);
        reset({name:'',public:false});
        }}>
        <ListItemIcon>
            <Add/>
        </ListItemIcon>
        <ListItemText>Create new list</ListItemText>
    </ListItemButton>:<form><Stack>
        <Typography sx={{...nameLabel,letterSpacing:'0.5px'}}>New List</Typography>
        <TextField required variant="standard" {...register('name')}/>
        <CheckboxField useFromControl={control} label={'Share to Clinic'} name='public'/>
        <LoadingButton loading={loading} onClick={handleSubmit(async(d)=>{
            const r=await handleCallAPI(d);
            if(r)setListDlgOpen(false);
            })}>Create</LoadingButton>
        </Stack>
        </form>}
    </List>
    </DialogContent>
    {errNotiComponent}
    </FieldDialog>

    </>
}