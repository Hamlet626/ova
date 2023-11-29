import { Box, Paper, Stack, Typography } from "@mui/material";
import EDFormTitles from "./form_titles";
import { font3, } from "@/components/ThemeRegistry/theme_consts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getFormData, getFormTemplate } from "../../../../../../../utils/server_data_getter/utils";
import { BackButton } from "@/components/back_button";

export default async function FormIndex({children, params}: { children: React.ReactNode, params: { agcid: string, formid:string } }) {
    
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
    const formTemplate=await getFormTemplate(params.agcid);
    const formData=await getFormData(user.id,myRole);

    return <Box display={'flex'} height='100%'>
        <Paper elevation={24} 
        sx={{width:'326px',minWidth:'326px', height:'100%', alignSelf:'stretch',px:4,pt:4, borderRadius:0, overflowY:'auto'}}>
            <BackButton text="Form Dashboard" link={`/ed/${params.agcid}/forms`}/>
            <Box height={32}/>
            <Typography sx={font3}>Form</Typography>
            <Box height={60}/>
            <EDFormTitles formid={params.formid} edid={user.id} data={formData}
            pathPrefix={`/ed/${params.agcid}/forms/detail`}/>
        </Paper>
        <Box ml={3} mr={10} pt={'35px'} flex={1} height={'100%'} display={'flex'} flexDirection={'column'} sx={{position:'relative'}} >
            {children}
        </Box>
    </Box>
}