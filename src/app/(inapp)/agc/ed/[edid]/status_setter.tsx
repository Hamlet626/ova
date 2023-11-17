'use client'
import { PopupComp } from "@/components/popup_comp";
import { UsersAgcDataRef } from "@/utils/firebase/firebase_client";
import { RoleNum } from "@/utils/roles";
import { refresh_server } from "@/utils/server_data_getter/utils";
import { EDStatus, EDStatusColors, EDStatusLabel } from "@/utils/types/status";
import { ArrowDropDown, Circle } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import { setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import { useState } from "react";

export const StatusSetter=({current,edid}:{current:EDStatus,edid:string})=>{
    const [loading, setLoading] = useState(false);
    const myid=useSession({required:true}).data?.user?.id!;
    const [status, setStatus] = useState(current);

    return <>
    <Stack direction={'row'} alignItems={'center'}>
        <Circle sx={{color:EDStatusColors[status]}}/>
        <Box width={12}/>
        <Typography variant="label1">{EDStatusLabel[status]}</Typography>
    </Stack>
    <PopupComp 
    compBuilder={(onClick)=>(
        <LoadingButton variant="contained" color="primary" loading={loading} endIcon={<ArrowDropDown/>} onClick={onClick}>
            Set Status
            </LoadingButton>
            )} 
    menuBuilder={(close)=>(<MenuList>
    {Object.entries(EDStatusLabel).map(et=>{
        const st=Number.parseInt(et[0]);
        const isCurrent=st===status;
        return <MenuItem selected={isCurrent} disabled={isCurrent} 
        onClick={async(ev)=>{
            close();
            setLoading(true);
            await setDoc(UsersAgcDataRef(RoleNum.ED,edid,myid),{status:st},{merge:true});
            setLoading(false);
            setStatus(st);
            // revalidateTag('ed_agc_data')
        }}>
            {et[1]}
            </MenuItem>;
        })}
    </MenuList>)}/>
    </>;
}