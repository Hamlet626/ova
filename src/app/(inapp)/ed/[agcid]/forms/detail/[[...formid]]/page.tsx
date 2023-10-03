import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "@/utils/roles";
import { Box } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";

export default async function Form({children, params}: { children: React.ReactNode, params: { agcid: string, formid?:string } }) {
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
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
    return <Box>
        
    </Box>
}