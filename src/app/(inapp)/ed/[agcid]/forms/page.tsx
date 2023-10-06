import { font3, font5, font6, outline_variant } from "@/components/ThemeRegistry/theme_consts";
import { roles } from "@/utils/roles";
import { ArrowForward, QuestionAnswerOutlined, Timeline } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Divider, Fab, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Scrollbar } from 'swiper/modules';
import { RemainedSlider } from "./remained_slider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { app } from "@/utils/firebase/firebase_client";

export default async function Forms({params}:{params: { agcid: string }}) {
    // const {user}=useSession({required:true}).data!;
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
    const formTemplate=await unstable_cache(
        async()=>{
            const r = await getDocs(collection(getFirestore(app),`user groups/agc/users/${params.agcid}/forms`));
            return r.docs.map(v=>({...v.data(),id:v.id}));
        },
        [params.agcid],
        {tags:['form_template'],revalidate:false}
    )();
    const formData=await unstable_cache(
        async()=>{
            const r = await getDocs(collection(getFirestore(app),`user groups/${roles[myRole].id}/users/${user.id}/form data`));
            return r.docs.map(v=>({...v.data(),id:v.id}));
        },
        [user.id],
        {tags:['form_data'],revalidate:6}
    )();

    const formsStatus=getFinishStatus(formTemplate,formData);
    const remained=formsStatus.filter((v)=>v.subs.remained);

    return <Box pt={'30px'} pl={4} pr='80px'>
        <Typography>{`${formData}`}</Typography>
        <Typography sx={font3}>My Form</Typography>
        <Box height={12}/>
        {remained.length>0 &&
        <>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <QuestionAnswerOutlined/>
            <Typography variant="subtitle2">Remained Question Groups</Typography>
            <Box flexGrow={1}></Box>
            <Link href={`/ed/${params.agcid}/forms/detail/0`} passHref>
            <Button variant="contained" startIcon={<ArrowForward/>} 
            // onClick={()=>redirect(`/ed/${params.agcid}/forms/xxx`)}
            >
                Continue
                </Button>
                </Link>
        </Box>
        <Box height={16}/>
        <RemainedSlider remainedData={remained} />
        <Box height={32}/>
        <Divider sx={{ml:'-999px', mr:'-80px'}}/>
        </>}
        <Box height={32}/>
        <Stack spacing={16}>
            {formsStatus.map((v,i)=>(
                <Card key={v.title} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                            <Typography variant="subtitle2" flexGrow={1}>{v.title}</Typography>
                            <Timeline/>
                            <Box width={8}/>
                            <Typography sx={font5}>Time Estimate: {v.stats.time}</Typography>
                            <Box width={40}/>
                            <LinearProgress value={v.stats.finished/v.stats.all*100} sx={{width:'136px'}}/>
                            <Box width={12}/>
                            <Typography sx={font5}>{v.stats.finished}/{v.stats.all} questions</Typography>
                        </Box>
                        </CardContent>
                    </CardActionArea>
                    <Divider/>
                    <CardContent>
                        <Box display={'flex'} flexDirection={'row'} height={60}>
                            <SubfieldsBlock section={v.subs.remained} agcid={params.agcid} formIndex={i}/>
                            <Divider orientation="vertical" sx={{mx:'27px'}}/>
                            <SubfieldsBlock section={v.subs.finished} agcid={params.agcid} formIndex={i} finished/>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    </Box>
}

const getFinishStatus=(template,data)=>{
    return [{title:'basic_info',stats:{time:'4 min',finished:15,all:24},subs:{finished:[],remained:['sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8','sub9','sub0']}}];
}

const SubfieldsBlock=({section,finished,agcid,formIndex,sx}:{section:any[],finished?:boolean,agcid:string,formIndex:Number, sx?:any})=>{
    return(<Box display={'flex'} flexDirection={'column'} flex={1} {...sx}>
        <Typography sx={font6}>{finished?'Finished Question Group':'Remained Question Group'}</Typography>
        <Box height={8}/>
        <Stack spacing='8px' direction={'row'}>
            {...section.map(v=>(
                <Link href={`/ed/${agcid}/forms/detail/${formIndex}?section=${encodeURIComponent("Text sec's& xx")}`}>
            <Chip key={v} label={v} color={finished?'secondary':'primary'} clickable />
            </Link>))}
        </Stack>
    </Box>);
}
