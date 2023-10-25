import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { FormTemp } from "@/utils/form/types";
import { RoleNum, roles } from "@/utils/roles";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { unstable_cache } from "next/cache";

export const getFormTemplate=(agcid:string)=>unstable_cache(
    async():Promise<FormTemp[]>=>{
        const r = await getDocs(collection(getFirestore(app),`user groups/agc/users/${agcid}/forms`));
        return Array.from({ length: 6 },
            (v,i)=>(r.docs.find(v=>Number(v.id)===i)?.data()??formTemplates[i]) as FormTemp);
    },
    [agcid],
    {tags:['form_template'],revalidate:6}
)();

export const getFormData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDocs(collection(getFirestore(app),`user groups/${roles[role].id}/users/${uid}/form data`));
        return Array.from({length:6},(v,i)=>r.docs.find(v=>Number(v.id)===i)?.data());
    },
    [uid],
    {tags:['form_data'],revalidate:6}
)();