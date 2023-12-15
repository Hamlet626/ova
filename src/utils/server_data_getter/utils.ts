'use server'
import { FilesCol, FormDataCol, FormTempCol, UserDoc, UsersAgcDataDoc } from "@/utils/firebase/path";
import { EDListsRef, FilesRef, app } from "@/utils/firebase/firebase_client";
import { formTemplates } from "@/utils/form/template";
import { FormTemp } from "@/utils/form/types";
import { RoleNum, roles } from "@/utils/roles";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { revalidateTag, unstable_cache } from "next/cache";
import { BasicInfoDoc, EDAgcInfoDoc, EDList, FileCol, RcpAgcInfoDoc } from "../firebase/types";
import { EDRec, RcpRec, algo_client } from "../algolia";

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
        return Array.from({length:6},(v,i)=>r.docs.find(v=>Number(v.id)===i)?.data()??{});
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

export const getAlgoData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await algo_client.initIndex(roles[role].id).getObject<EDRec|RcpRec>(uid);
        return r;
    },
    [uid,`${role}`],
    {tags:['basic_data'],revalidate:60}
)();



export const getAgcFbData=(uid:string,agcid:string,role:RoleNum=RoleNum.ED)=>unstable_cache(
    async()=>{
        const r = await getDoc(doc(getFirestore(app),UsersAgcDataDoc(role,uid,agcid)));
        return (r.data()??{}) as Omit<RcpAgcInfoDoc,'status'>&Omit<EDAgcInfoDoc,'status'>&{status:number};
    },
    [uid,agcid,`${role}`],
    {tags:['ed_agc_data'],revalidate:10}
)();

export const getFilesData=(uid:string,role:RoleNum)=>unstable_cache(
    async()=>{
        const r = await getDocs(FilesRef(role,uid));
        return r.docs.map(v=>({...v.data(),id:v.id} as FileCol));
    },
    [uid,`${role}`],
    {tags:['file_data'],revalidate:12}
)();


export const getEDListsData=(uid:string)=>unstable_cache(
    async()=>{
        const r = await getDocs(EDListsRef(uid));
        return r.docs.map(v=>({...v.data(),id:v.id} as EDList));
    },
    [uid],
    {tags:['ed_lists_data'],revalidate:12}
)();


export const refresh_server=(tag:string)=>{
    // 'use server'

    revalidateTag(tag)
}