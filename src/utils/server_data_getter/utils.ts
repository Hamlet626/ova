'use server'
import { FormDataCol, FormTempCol, UserDoc, UsersAgcDataDoc } from "@/utils/firebase/path";
import { app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { FormTemp } from "@/utils/form/types";
import { RoleNum, roles } from "@/utils/roles";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { revalidateTag, unstable_cache } from "next/cache";
import { BasicInfoDoc, GCAgcInfoDoc } from "../firebase/types";

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
    {tags:['form_data'],revalidate:60}
)();




export const getBasicFbData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDoc(doc(getFirestore(app),UserDoc(role,uid)));
        return r.data() as BasicInfoDoc;
    },
    [uid,`${role}`],
    {tags:['basic_data'],revalidate:60}
)();

export const getAgcFbData=(uid:string,agcid:string,role:RoleNum=RoleNum.ED)=>unstable_cache(
    async()=>{
        const r = await getDoc(doc(getFirestore(app),UsersAgcDataDoc(role,uid,agcid)));
        return r.data() as GCAgcInfoDoc;
    },
    [uid,agcid,`${role}`],
    {tags:['ed_agc_data'],revalidate:10}
)();

export const refresh_server=(tag:string)=>{
    // 'use server'

    revalidateTag(tag)
}