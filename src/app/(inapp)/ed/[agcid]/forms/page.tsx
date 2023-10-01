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

export default async function Forms({params}:{params: { agcid: string }}) {
    // const {user}=useSession({required:true}).data!;
    const {user}=(await getServerSession(authOptions))!;
    
    const myRole=user?.role!;
    const formTemplate=await getDocs(collection(getFirestore(),`user groups/agc/users/${params.agcid}/forms`));
    const formData=await getDocs(collection(getFirestore(),`user groups/${roles[myRole].id}/users/${user?.id}/form data`));

    const formsStatus=getFinishStatus(formTemplate,formData);
    const remained=formsStatus.filter((v)=>v.subs.remained);

    return <Box pt={'30px'} pl={4} pr='80px'>
        <Typography sx={font3}>My Form</Typography>
        <Box height={12}/>
        {remained.length>0 &&
        <>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <QuestionAnswerOutlined/>
            <Typography variant="subtitle2">Remained Question Groups</Typography>
            <Box flexGrow={1}></Box>
            <Link href={`/ed/${params.agcid}/forms/detail`} passHref>
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
        <Divider sx={{ml:'-999px', mr:'-999px'}}/>
        </>}
        <Box height={32}/>
        <Stack spacing={16}>
            {formsStatus.map((v)=>(
                <Card  key={v.title} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                            <Typography variant="subtitle2" flexGrow={1}>{v.title}</Typography>
                            <Timeline/>
                            <Box width={8}/>
                            <Typography sx={font5}>Time Estimate: {v.stats.time}</Typography>
                            <Box width={40}/>
                            <LinearProgress variant="determinate" value={v.stats.finished/v.stats.all*100} sx={{width:'136px'}}/>
                            <Box width={12}/>
                            <Typography sx={font5}>{v.stats.finished}/{v.stats.all} questions</Typography>
                        </Box>
                        </CardContent>
                    </CardActionArea>
                    <Divider/>
                    <CardContent>
                        <Box display={'flex'} flexDirection={'row'} height={60}>
                            <SubfieldsBlock section={v.subs.remained}/>
                            <Divider orientation="vertical" sx={{mx:'27px'}}/>
                            <SubfieldsBlock section={v.subs.finished} finished/>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    </Box>
}

const getFinishStatus=(template,data)=>{
    return [{title:'basic_info',stats:{time:'4 min',finished:15,all:24},subs:{finished:[],remained:['sub1','sub2','sub1','sub2','sub1','sub2','sub1','sub2','sub1','sub2']}}];
}

const SubfieldsBlock=({section,finished,sx}:{section:any[],finished?:boolean,sx?:any})=>{
    return(<Box display={'flex'} flexDirection={'column'} flex={1} {...sx}>
        <Typography sx={font6}>{finished?'Finished Question Group':'Remained Question Group'}</Typography>
        <Box height={8}/>
        <Stack spacing='8px' direction={'row'}>
            {...section.map(v=>(<Chip key={v} label={v} color={finished?'secondary':'primary'}/>))}
        </Stack>
    </Box>);
}
