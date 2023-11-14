import { FormDataCol, FormTempCol, UserDoc } from "@/utils/firebase/database_consts";
import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { FormTemp } from "@/utils/form/types";
import { RoleNum, roles } from "@/utils/roles";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { unstable_cache } from "next/cache";

export const getFormTemplate=(agcid:string)=>unstable_cache(
    async():Promise<FormTemp[]>=>{
        const r = await getDocs(collection(getFirestore(app),FormTempCol(agcid)));
        return Array.from({ length: 6 },
            (v,i)=>(r.docs.find(v=>Number(v.id)===i)?.data()??formTemplates[i]) as FormTemp);
    },
    [agcid],
    {tags:['form_template'],revalidate:6}
)();

export const getFormData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDocs(collection(getFirestore(app),FormDataCol(role,uid)));
        return Array.from({length:6},(v,i)=>r.docs.find(v=>Number(v.id)===i)?.data());
    },
    [uid],
    {tags:['form_data'],revalidate:6}
)();




export const getBasicFbData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDoc(doc(getFirestore(app),UserDoc(role,uid)));
        return r.data();
    },
    [uid,`${role}`],
    {tags:['basic_data'],revalidate:6}
)();