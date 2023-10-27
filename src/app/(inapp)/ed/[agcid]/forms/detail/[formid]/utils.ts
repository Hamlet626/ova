import { FormDataCol, FormTempCol } from "@/utils/firebase/database_consts";
import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { FormTemp } from "@/utils/form/types";
import { RoleNum, roles } from "@/utils/roles";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { unstable_cache } from "next/cache";

export const getFormTemplate=(agcid:string)=>unstable_cache(
    async():Promise<FormTemp[]>=>{
        const r = await getDocs(collection(getFirestore(app),FormTempCol(agcid)));
        return Array.from({ length: 6 },
            (v,i)=>(r.docs.find(v=>Number(v.id)===i)?.data()??formTemplates[i]) as FormTemp);
    },
    [agcid],
    {tags:['form_template'],revalidate:false}
)();

export const getFormData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDocs(collection(getFirestore(app),FormDataCol(role,uid)));
        return Array.from({length:6},(v,i)=>r.docs.find(v=>Number(v.id)===i)?.data());
    },
    [uid],
    {tags:['form_data'],revalidate:6}
)();