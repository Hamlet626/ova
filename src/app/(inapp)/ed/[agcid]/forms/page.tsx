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
import { formStatus, getFinishStatus, secFinished } from "@/utils/form/form_utils/status";
import { getFormData, getFormTemplate } from "../../../../../utils/server_data_getter/utils";
import { FormTemp } from "@/utils/form/types";
import { FormStatsTiles } from "../../../../_shared/_forms/form_tiles";

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
            <Button variant="contained" startIcon={<ArrowForward/>} 
            LinkComponent={Link}
            href={`/ed/${params.agcid}/forms/detail/${remained[0].index}?section=${encodeURIComponent(remained[0].subs.remained[0])}`}
            // onClick={()=>redirect(`/ed/${params.agcid}/forms/xxx`)}
            >
                Continue
                </Button>
        </Box>
        <Box height={16}/>
        <RemainedSlider remainedData={remained} agcid={params.agcid}/>
        <Box height={32}/>
        <Divider sx={{ml:'-999px', mr:'-80px'}}/>
        </>}
        <Box height={32}/>
        <FormStatsTiles formsStatus={formsStatus} prePath={`/ed/${params.agcid}/forms/detail`}/>
        <Box height={32}/>
    </Box>
}

