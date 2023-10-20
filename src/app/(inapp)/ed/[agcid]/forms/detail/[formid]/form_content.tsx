'use client'
import { font7, font8 } from "@/components/ThemeRegistry/theme_consts";
import { ArrowBack, ArrowForward, Check, TimelapseOutlined, } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormFieldUI from "./form_field";
import { Form, useForm } from "react-hook-form";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase/firebase_client";
import { addStoredForm, formStatus, getStoredForm, secFinished } from "@/utils/form/utils";
import { FormTemp } from "@/utils/form/types";

export default function FormContent({formid, agcid, template, data, uid}:{ formid:number, agcid:string, template:FormTemp, data:any, uid:string} ){
    const sectionName = decodeURIComponent(useSearchParams().get("section")??"");
    const initialSec=Math.max(0,template.content.findIndex((v,i)=>v.title===sectionName));
    const initialField=Math.max(0,template.content[initialSec].fields.findIndex((v)=>v.required&&data?.[v.id??""]==null));
    const [sectionNum,setSectionNum]=useState(initialSec);
    const isLastSec=template.content.length===sectionNum+1;
    const [fieldNum,setFieldNum]=useState(initialField);
    const router=useRouter();

    const {handleSubmit, register, formState:{errors} }=useForm({defaultValues:data});

    const stats=formStatus(data,template);

    const onSubmit = async (data:any,nextSec?: number|null) => {
        
        addStoredForm(formid,{data});

        if(nextSec==null){
            //setDoc(doc(getFirestore(app),`user groups/ed/users/${uid}/form data/${formid}`),{...preData,data},{merge:true});
            router.push(`ed/${agcid}/forms/detail/${formid+1}`);                
        }
        else setSectionNum(nextSec);
    }

    return <>
        {/* <Button sx={{position:'absolute'}} onClick={()=>{
            localStorage.setItem(`test`,JSON.stringify({test:'new data'}));
        }}>test set localStorage</Button> */}
        <Stack direction={'column'}>
            <Stack direction={'row'} alignItems={'center'}>
                    <TimelapseOutlined color="secondary"/>
                    <Box width={4}/>
                    <Typography sx={font8} color={'secondary'} whiteSpace={'nowrap'}>{stats.time}</Typography>
                    <Box width={4}/>
                    <LinearProgress value={stats.finished/stats.all} sx={{width:'100%'}}/>    
                    <Box width={24}/>
            <Typography sx={font7} color={'primary'}>{stats.finished} </Typography> 
            <Typography sx={font7} whiteSpace={'nowrap'}>/ {stats.all}</Typography> 
            </Stack>
            <Box height={8}/>
            <Stack direction={'row'} alignItems={'end'}>
                    <Typography variant="h5" color={'secondary'}>{template.content[sectionNum].title}</Typography>
                    <Box flexGrow={1}/>
                    <Breadcrumbs separator='-'>
                    {template.content.map((v,i)=>{
                        if(i===sectionNum)return null;
                        const finished=secFinished(data,v);
                        return <Chip key={i} icon={finished?<Check/>:undefined} label={v.title} 
                        onClick={handleSubmit((d)=>onSubmit(d,i))}/>;
                    })}
                    </Breadcrumbs>
                </Stack>
        </Stack>

            <Box flex={1} display={'flex'} flexDirection={'column'} overflow={'auto'}>
                <Box height={42}/>
                {/* <Stack direction={'row'} alignItems={'end'}>
                    <Typography variant="h5" color={'secondary'} minWidth={'360px'}>{template.content[sectionNum].title}</Typography>
                    <Box width={40}/>
                    <TimelineOutlined color="secondary"/>
                    <Box width={4}/>
                    <Typography sx={font8} color={'secondary'}>{'time xxx'}</Typography>
                </Stack> */}
                <Box flex={1} display={'flex'} flexDirection={'column'} justifyContent={'center'} pt={10} pb={20} px={6}>
                <form onSubmit={handleSubmit((d)=>onSubmit(d,isLastSec?null:sectionNum+1))}>
                    {template.content[sectionNum].fields.map((v,i)=><FormFieldUI key={i} data={v} register={register}/>)}
                </form>
                </Box>
                </Box>

        <Stack position={'absolute'} direction={'row'} pb={'47px'} bottom={0} width={'100%'} 
        sx={{backdropFilter: 'blur(2px)', background:'linear-gradient(to top, white, transparent)'}}>
            {sectionNum>0 && <Button color={'secondary'} variant="outlined" startIcon={<ArrowBack/>} 
            onClick={handleSubmit((d)=>onSubmit(d,sectionNum-1))}>Previous</Button>}
            <Box flexGrow={1}/>
            <Button variant="contained" startIcon={<ArrowForward/>}
            onClick={handleSubmit((d)=>onSubmit(d,isLastSec?null:sectionNum+1))}>{isLastSec?'done':'Continue'}</Button>
        </Stack>
    </>
}