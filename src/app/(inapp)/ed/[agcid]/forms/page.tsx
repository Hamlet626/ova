import { font3 } from "@/components/ThemeRegistry/theme_consts";
import { roles } from "@/utils/roles";
import { ArrowForward, QuestionAnswerOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardContent, Fab, IconButton, Typography } from "@mui/material";
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

    const status=getFinishStatus(formTemplate,formData);
    const remained=status.filter((v)=>v.subs.remained);

    return <Box pt={'30px'} pl={4} mr='80px'>
        <Box width={'100%'} height={30} bgcolor={'red'}/>
        <Typography sx={font3}>My Form</Typography>
        <Box height={12}/>
        {remained.length>0 &&
        <>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <QuestionAnswerOutlined/>
            <Typography variant="subtitle2">Remained Question Groups</Typography>
            <Box flexGrow={1}></Box>
            <Link href={`/ed/${params.agcid}/forms/xxx`} passHref>
            <Button variant="contained" startIcon={<ArrowForward/>} 
            // onClick={()=>redirect(`/ed/${params.agcid}/forms/xxx`)}
            >
                Continue
                </Button>
                </Link>
        </Box>
        <Box height={16}/>
        <RemainedSlider remainedData={remained} />
        </>}
    </Box>
}

const getFinishStatus=(template,data)=>{
    return [{title:'basic_info',stats:{},subs:{finished:[],remained:['sub1','sub2','sub1','sub2','sub1','sub2','sub1','sub2','sub1','sub2']}}];
}
