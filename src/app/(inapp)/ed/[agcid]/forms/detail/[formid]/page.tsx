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
import { FormTemp, basic_info, formTemplates } from "@/utils/form/template";
import { app } from "@/utils/firebase/firebase_client";
import { getFormData, getFormTemplate } from "./utils";

export default async function FormDetail({params}: {params: { agcid: string, formid:string } }) {
    // const {data,status}=useSession({required:true});
    // if(status==='loading')return <Box/>
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role;
    
    const formTemplate=await getFormTemplate(params.agcid);
    const formData=await getFormData(user.id,myRole);
    const formIdex=Number(params.formid);

    return <FormContent formid={formIdex} agcid={params.agcid} template={formTemplate[formIdex]} data={formData[formIdex]} uid={user.id}/>;
}