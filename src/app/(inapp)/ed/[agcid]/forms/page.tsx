import { font3, font5, font6, outline_variant } from "@/components/ThemeRegistry/theme_consts";
import { roles } from "@/utils/roles";
import { ArrowForward, QuestionAnswerOutlined, Timeline } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Divider, Fab, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { RemainedSlider } from "./remained_slider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { formStatus, secFinished } from "@/utils/form/form_utils/status";
import { getFormData, getFormTemplate } from "./detail/[formid]/utils";
import { FormTemp } from "@/utils/form/types";

export default async function Forms({params}:{params: { agcid: string }}) {
    // const {user}=useSession({required:true}).data!;
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
    const formTemplate=await getFormTemplate(params.agcid);
    const formData=await getFormData(user.id,myRole);

    const formsStatus=getFinishStatus(formTemplate,formData);
    const remained=formsStatus.filter((v)=>v.subs.remained.length>0);

    return <Box pt={'30px'} pl={4} pr='80px'>
        <Typography sx={font3}>My Form</Typography>
        <Box height={12}/>
        {remained.length>0 &&
        <>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <QuestionAnswerOutlined/>
            <Typography variant="subtitle2">Remained Question Groups</Typography>
            <Box flexGrow={1}></Box>
            <Link href={`/ed/${params.agcid}/forms/detail/0?section=${encodeURIComponent(remained[0].subs.remained[0])}`} passHref>
            <Button variant="contained" startIcon={<ArrowForward/>} 
            // onClick={()=>redirect(`/ed/${params.agcid}/forms/xxx`)}
            >
                Continue
                </Button>
                </Link>
        </Box>
        <Box height={16}/>
        <RemainedSlider remainedData={remained} agcid={params.agcid}/>
        <Box height={32}/>
        <Divider sx={{ml:'-999px', mr:'-80px'}}/>
        </>}
        <Box height={32}/>
        <Stack spacing={2}>
            {formsStatus.map((v,i)=>(
                <Card key={v.title} variant="outlined">
                    <Link href={`/ed/${params.agcid}/forms/detail/${v.index}?section=${encodeURIComponent(v.subs.remained[0])}`}>
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
                    </Link>
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
        <Box height={32}/>
    </Box>
}

const getFinishStatus=(template:FormTemp[],data:any[])=>{
    return template.map((v,i)=>({
        title:v.name,index:i,
        stats:formStatus(data[i],v),
        subs:{
            finished:v.content.filter(v=>secFinished(data[i],v)).map(v=>v.title),
            remained:v.content.filter(v=>!secFinished(data[i],v)).map(v=>v.title)
        }}
    ));
}

const SubfieldsBlock=({section,finished,agcid,formIndex,sx}:{section:any[],finished?:boolean,agcid:string,formIndex:Number, sx?:any})=>{
    return(<Box display={'flex'} flexDirection={'column'} flex={1} {...sx}>
        <Typography sx={font6}>{finished?'Finished Question Group':'Remained Question Group'}</Typography>
        <Box height={8}/>
        <Stack spacing={1} direction={'row'}>
            {...section.map(v=>(
                <Link href={`/ed/${agcid}/forms/detail/${formIndex}?section=${encodeURIComponent(v)}`}>
            <Chip key={v} label={v} color={finished?'secondary':'primary'} clickable />
            </Link>))}
        </Stack>
    </Box>);
}
