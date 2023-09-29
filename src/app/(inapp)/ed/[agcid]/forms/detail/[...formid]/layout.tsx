import { Box, Paper, Stack, Typography } from "@mui/material";
import EDFormTitles from "./form_titles";
import Link from "next/link";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { font3, font7 } from "@/components/ThemeRegistry/theme_consts";

export default async function FormIndex({children, params}: { children: React.ReactNode, params: { agcid: string, formid?:string } }) {
    
    // console.log(params.formid);
    // return <Box bgcolor={'red'} width={'19900px'} height={'199900px'}/>;

    return <Box display={'flex'}>
        <Paper sx={{width:'326px', alignSelf:'stretch',height:'9999px',px:4,pt:4}}>
            <Link href={`/ed/${params.agcid}/forms`} passHref>
                <Stack direction={'row'} spacing={'10px'}>
                    <ArrowBackIos/>
                    <Typography sx={font7}>Form Dashboard</Typography>
                </Stack>
            </Link>
            <Box height={32}/>
            <Typography sx={font3}>Form</Typography>
            <Box height={60}/>
            <EDFormTitles/>
        </Paper>
        {children}
    </Box>
}