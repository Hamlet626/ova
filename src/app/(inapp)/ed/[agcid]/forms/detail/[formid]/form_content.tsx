'use client'
import { font7 } from "@/components/ThemeRegistry/theme_consts";
import { FormTemp } from "@/utils/form/template";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FormContent({formid, template, data}:{ formid:string, template:FormTemp, data:any } ){
    const sectionName = decodeURIComponent(useSearchParams().get("section")??"");
    const initialSec=Math.max(0,template.content.findIndex((v,i)=>v.title===sectionName));
    const initialField=Math.max(0,template.content[initialSec].fields.findIndex((v)=>v.required&&data[v.id??""]==null));
    const [sectionNum,setSectionNum]=useState(initialSec);
    const [fieldNum,setFieldNum]=useState(initialField);
    const [progression,setProg]=useState(0);

    return <>
        <Button sx={{position:'absolute'}} onClick={()=>{
            localStorage.setItem(`form${formid}`,JSON.stringify({test:'new data'}));
        }}>test</Button>
        {/* <Stack alignSelf={'stretch'}> */}
            <Stack direction={'row'} width={'100%'} alignItems={'center'}>
            <LinearProgress value={progression} sx={{width:'100%'}}/>         
            <Typography sx={font7} color={'primary'}>{progression} </Typography> 
            <Typography sx={{...font7, whiteSpace: 'nowrap',}}>/ 100%</Typography> 
            </Stack>
        {/* </Stack> */}
        <Stack position={'absolute'} direction={'row'} bottom={'47px'} width={'100%'} justifyContent="space-between">
            <Button color={'secondary'} variant="outlined" startIcon={<ArrowBack/>}>Previous</Button>
            <Button variant="contained" startIcon={<ArrowForward/>}>Continue</Button>
        </Stack>
    </>
}