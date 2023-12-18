'use client'
import { EdAlgoTile } from "@/app/_shared/_ed/_ed_tiles/algo_tile";
import { LoadingEDTile } from "@/app/_shared/_ed/_ed_tiles/loading_tile";
import { edTileMaxWidth, edTileMinWidth } from "@/app/_shared/_ed/_eds_blocks/consts";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { EDListRef, FileRef } from "@/utils/firebase/firebase_client";
import { EDListDoc } from "@/utils/firebase/path";
import { EDList } from "@/utils/firebase/types";
import { usePromiseState } from "@/utils/hooks/use_promise_state";
import { RoleNum, roles } from "@/utils/roles";
import { getUserAlgoData_client } from "@/utils/server_data_getter/client_getter";
import { Cancel, Check, CheckCircle, Delete, Edit } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const EDListClientContent=({initialData,uid}:{initialData:EDList,uid:string})=>{
    const router=useRouter();
    const [listData,setListData]=useState(initialData);
    const [confirmDelete,setConfirmDelete]=useState(false);
    const [editedName,setEditedName]=useState<string|undefined>();

    const agcid=getCliId_Client();
    const algoKeys=['Birthday','Height','Weight','bmi','highest level of education'];
    const [filter,setFilter]=useState('Default');

    const {data:edsAlgoData,setData:setEds}=usePromiseState(()=>Promise.all(listData.eds.map(v=>getUserAlgoData_client(RoleNum.ED,v))),[listData.eds]);

    const sort=(value:string)=>{
        switch (value) {
            case 'Default':
                setEds(Array.from(edsAlgoData!.sort((a,b)=>listData.eds.indexOf(a.objectID)-listData.eds.indexOf(b.objectID))));
                break;
            case 'Price':
                setEds(Array.from(edsAlgoData!.sort((a,b)=>(a.agencies[agcid!]?.price??Number.POSITIVE_INFINITY)-
                (b.agencies[agcid!]?.price??Number.POSITIVE_INFINITY))));
                break;
            default:
                setEds(Array.from(edsAlgoData!.sort((a,b)=>{
                    const aNA=a[value]==null;
                    const bNA=b[value]==null;
                    return aNA&&bNA?0:aNA?1:bNA?-1:Number(aNA)-Number(bNA);
                })));
                break;
        }
        setFilter(value);
    }
    
    return (<>
    <Stack>
        <Stack direction={'row'} alignItems={'center'}>
            {editedName==null?[
                <Typography sx={PageHeader}>{initialData.id==='like'?'Like':listData.name}</Typography>,
                ...initialData.id==='like'?[]:[
                <Box width={30}/>,
                <IconButton disableRipple color="secondary" onClick={()=>setEditedName(listData.name)}><Edit/></IconButton>,
                <Box width={24}/>,
                <IconButton disableRipple onClick={()=>setConfirmDelete(true)}><Delete/></IconButton>,
                <Box width={30}/>]
            ]:[
                    <TextField value={editedName} onChange={(ev)=>setEditedName(ev.target.value)} variant="standard"/>,
                    <IconButton disableRipple color="secondary" 
                    disabled={editedName.trim().length===0}
                    onClick={()=>{
                        setListData({...listData,name:editedName.trim()});
                        updateDoc(EDListRef(uid,listData.id!),{name:editedName.trim()});
                        setEditedName(undefined);
                    }}
                    ><CheckCircle/></IconButton>,
                    <IconButton disableRipple color="secondary" onClick={()=>setEditedName(undefined)}><Cancel/></IconButton>
                ]
        }
        </Stack>

        <Stack direction={'row'}>
        <FormControlLabel control={<Checkbox value={listData.public}/>}
        label={'share with clinic'} checked={listData.public??false}
        onChange={(ev,v)=>{
            setListData({...listData,public:v});
            updateDoc(EDListRef(uid,listData.id!),{public:v});
        }}/>
        <Box flexGrow={1}/>
        <TextField select label='Sort By' onChange={(event) =>sort(event.target.value)}
        value={filter} sx={{width:200, alignSelf:'end'}}>
            {['Default','Price',...algoKeys].map((option,i) => (
                <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
            ))}
            </TextField>
        </Stack>

        <Box height={29}/>

        <Grid2 container rowSpacing={'20px'} columnSpacing={3} >
        {edsAlgoData==null?
        listData.eds.map((v,i)=>
            <Grid2 key={i} xs maxWidth={edTileMaxWidth} minWidth={edTileMinWidth}>
                <LoadingEDTile/>
            </Grid2>):
        edsAlgoData.map((v,i)=>
            <Grid2 key={v.objectID} xs maxWidth={edTileMaxWidth} minWidth={edTileMinWidth}>
                <EdAlgoTile hit={v as any} sendEvent/>
            </Grid2>)}
        </Grid2>

        <Box flexGrow={1}/>
            
    </Stack>
    <ConfirmDialog open={confirmDelete} close={()=>setConfirmDelete(false)} 
        // title={`Remove Collection ${data.name}`}
        content={`Please confirm to delete ${listData?.name}?`}
        onConfirm={async()=>{
            await deleteDoc(EDListRef(uid,listData.id!));
            router.replace(`${roles[RoleNum.Rcp].path}/lists`);
        }}/>
    </>);
}