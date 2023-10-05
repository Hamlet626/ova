'use client'
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FormContent({formid, template, data}:{ formid:string, template:any, data:any } ){
    const sectionName = decodeURIComponent(useSearchParams().get("section")??"");
    const [section,setSection]=useState(template.)

    return <>
        <Button onClick={()=>{
            localStorage.setItem(`form${formid}`,JSON.stringify({test:'new data'}));
        }}>test</Button>

        <Stack position={'absolute'} direction={'row'} bottom={'47px'} width={'100%'} justifyContent="space-between">
            <Button color={'secondary'} variant="outlined" startIcon={<ArrowBack/>}>Previous</Button>
            <Button variant="contained" startIcon={<ArrowForward/>}>Continue</Button>
        </Stack>
    </>
}