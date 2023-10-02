import { Box, Paper, Stack, Typography } from "@mui/material";
import EDFormTitles from "./form_titles";
import Link from "next/link";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import { font3, font7 } from "@/components/ThemeRegistry/theme_consts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "@/utils/roles";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";

export default async function FormIndex({children, params}: { children: React.ReactNode, params: { agcid: string, formid?:string } }) {
    
    // console.log(params.formid);
    // return <Box bgcolor={'red'} width={'19900px'} height={'199900px'}/>;
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
    const formTemplate=await unstable_cache(
        async()=>{
            console.log('form template in Detail Layout')
            return getDocs(collection(getFirestore(),`user groups/agc/users/${params.agcid}/forms`))},
        [params.agcid],
        {tags:['form_template'],revalidate:false}
    )();
    const formData=await unstable_cache(
        async()=>{
            console.log('form data in Detail Layout')
            return getDocs(collection(getFirestore(),`user groups/${roles[myRole].id}/users/${user.id}/form data`))},
        [user.id],
        {tags:['form_data'],revalidate:60}
    )();

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