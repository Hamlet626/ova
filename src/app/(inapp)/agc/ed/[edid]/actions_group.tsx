'use client'
import { outline, neutral96 } from "@/components/ThemeRegistry/theme_consts"
import { Remove, HistoryToggleOff, BorderColor } from "@mui/icons-material"
import { ButtonGroup, Button, Typography } from "@mui/material"
import EditProfileDialog from "./edit_profile_dialog"
import { useState } from "react"

export const ActionsGroup=()=>{
    const [openEdPf,setOpenEdPf]=useState(false);

    return <>
    <ButtonGroup variant="outlined">
        <Button startIcon={<Remove/>} sx={{borderColor:outline,bgcolor:neutral96}}>
            <Typography color={'black'}>Remove</Typography>
        </Button>
        <Button startIcon={<HistoryToggleOff/>} sx={{borderColor:outline,bgcolor:neutral96}}>
            <Typography color={'black'}>Log</Typography>
        </Button>
        <Button startIcon={<BorderColor/>} sx={{borderColor:outline,bgcolor:neutral96}}
        onClick={()=>setOpenEdPf(true)}
        >
            <Typography color={'black'}>Edit</Typography>
        </Button>
        </ButtonGroup>
        <EditProfileDialog handleData={async (v?: any)=>{
            if(v==null)return setOpenEdPf(false);
            // throw new Error("Function not implemented.")
        } } defaultValues={undefined} open={openEdPf}/>
        </>
}