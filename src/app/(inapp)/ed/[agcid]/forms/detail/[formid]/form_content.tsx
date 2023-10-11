'use client'
import { font7, font8 } from "@/components/ThemeRegistry/theme_consts";
import { FormTemp } from "@/utils/form/template";
import { ArrowBack, ArrowForward, TimelineOutlined } from "@mui/icons-material";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormFieldUI from "./form_field";
import { Form, useForm } from "react-hook-form";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase/firebase_client";

export default function FormContent({formid, agcid, template, data, uid}:{ formid:string, agcid:string, template:FormTemp, data:any, uid:string} ){
    const sectionName = decodeURIComponent(useSearchParams().get("section")??"");
    const initialSec=Math.max(0,template.content.findIndex((v,i)=>v.title===sectionName));
    const initialField=Math.max(0,template.content[initialSec].fields.findIndex((v)=>v.required&&data[v.id??""]==null));
    const [sectionNum,setSectionNum]=useState(initialSec);
    const isLastSec=template.content.length===sectionNum+1;
    const [fieldNum,setFieldNum]=useState(initialField);
    const [progression,setProg]=useState(0);
    const router=useRouter();

    const {handleSubmit, register, formState:{errors} }=useForm({defaultValues:{"password":10}});

    const onSubmit = async (data) => {
    console.log(data);
    const preData=JSON.parse(localStorage.getItem(`form${formid}`)??'');
    localStorage.setItem(`form${formid}`,JSON.stringify({...preData,data}));
    if(isLastSec){
        setDoc(doc(getFirestore(app),`user groups/ed/users/${uid}/form data/${Number(formid)+1}`),{...preData,data},{merge:true});
        router.push(`ed/${agcid}/forms/detail/${Number(formid)+1}`);                
    }else{
        setSectionNum(sectionNum+1);
    }
    }

    return <>
        {/* <Button sx={{position:'absolute'}} onClick={()=>{
            localStorage.setItem(`form${formid}`,JSON.stringify({test:'new data'}));
        }}>test</Button> */}
            <Stack direction={'row'} alignItems={'center'}>
            <LinearProgress value={progression} sx={{width:'100%'}}/>    
                    <Box width={24}/>     
            <Typography sx={font7} color={'primary'}>{progression} </Typography> 
            <Typography sx={{...font7, whiteSpace: 'nowrap',}}>/ 100%</Typography> 
            </Stack>

            <Box flex={1} display={'flex'} flexDirection={'column'} overflow={'auto'}>
                <Box height={42}/>
                <Stack direction={'row'} alignItems={'end'}>
                    <Typography variant="h5" color={'secondary'} minWidth={'360px'}>{template.content[sectionNum].title}</Typography>
                    <Box width={40}/>
                    <TimelineOutlined color="secondary"/>
                    <Box width={4}/>
                    <Typography sx={font8} color={'secondary'}>{'time xxx'}</Typography>
                </Stack>
                <Box flex={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} pt={10} pb={20} px={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {template.content[sectionNum].fields.map((v)=><FormFieldUI data={v} register={register}/>)}
                </form>
                </Box>
                </Box>

        <Stack position={'absolute'} direction={'row'} pb={'47px'} bottom={0} width={'100%'} justifyContent="space-between" 
        sx={{backdropFilter: 'blur(2px)', background:'linear-gradient(to top, white, transparent)'}}>
            <Button color={'secondary'} variant="outlined" startIcon={<ArrowBack/>}>Previous</Button>
            <Button variant="contained" startIcon={<ArrowForward/>} onClick={handleSubmit(onSubmit)}>Continue</Button>
        </Stack>
    </>
}