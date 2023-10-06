import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "@/utils/roles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { unstable_cache } from "next/cache";
import FormContent from "./form_content";
import { basic_info } from "@/utils/form/template";

export default async function Form({params}: {params: { agcid: string, formid:string } }) {
    // const {data,status}=useSession({required:true});
    // if(status==='loading')return <Box/>
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role;
    
    const formTemplate=await unstable_cache(
        async()=>{
            return getDocs(collection(getFirestore(),`user groups/agc/users/${params.agcid}/forms`))},
        [params.agcid],
        {tags:['form_template'],revalidate:false}
    )();
    const formData=await unstable_cache(
        async()=>{
            return getDocs(collection(getFirestore(),`user groups/${roles[myRole].id}/users/${user.id}/form data`))},
        [user.id],
        {tags:['form_data'],revalidate:60}
    )();

    return <FormContent formid={params.formid} template={basic_info} data={{}}/>;
}