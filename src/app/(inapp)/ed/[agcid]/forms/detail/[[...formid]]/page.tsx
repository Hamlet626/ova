'use client'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "@/utils/roles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { unstable_cache } from "next/cache";

export default function Form({children, params}: { children: React.ReactNode, params: { agcid: string, formid?:string } }) {
    const {data,status}=useSession({required:true});
    if(status==='loading')return <Box/>
    // const user=session.data?.user!;//(await getServerSession(authOptions))!.user!;
    
    const myRole=data!.user!.role!;
    
    // const formTemplate=await unstable_cache(
    //     async()=>{
    //         return getDocs(collection(getFirestore(),`user groups/agc/users/${params.agcid}/forms`))},
    //     [params.agcid],
    //     {tags:['form_template'],revalidate:false}
    // )();
    // const formData=await unstable_cache(
    //     async()=>{
    //         return getDocs(collection(getFirestore(),`user groups/${roles[myRole].id}/users/${data!.user!.id}/form data`))},
    //     [data!.user!.id],
    //     {tags:['form_data'],revalidate:60}
    // )();
    return <Box pl={3} pr={10} pt={'35px'} flex={1} bgcolor={'red'} //sx={{position:'realative'}} 
    >
        <Button onClick={()=>{
            localStorage.setItem(`form${params.formid??0}`,JSON.stringify({test:'new data'}));
        }}>test</Button>

        <Box position={'absolute'} top={'30px'} width={'100%'} height={'300px'} bgcolor={'blue'}/>
        <Stack position={'absolute'} direction={'row'} bottom={'47px'} width={'100%'} justifyContent="space-between">
            <Button color={'secondary'} variant="outlined" startIcon={<ArrowBack/>}>Previous</Button>
            <Button variant="contained" startIcon={<ArrowForward/>}>Continue</Button>
        </Stack>
    </Box>
}