import { cache } from "react";
import { RoleNum, roles } from "../roles";
import { getDoc, doc, getFirestore, getDocs } from "firebase/firestore";
import { UserDoc, UsersAgcDataDoc } from "../firebase/path";
import { BasicInfoDoc, EDAgcInfoDoc, EDList, RcpAgcInfoDoc } from "../firebase/types";
import { EDListsRef, app } from "../firebase/firebase_client";
import { algo_client, EDRec, RcpRec } from "../algolia";

export const getUserBasicFbData_client=cache(async(uid:string,role:RoleNum)=>{
    const r = await getDoc(doc(getFirestore(app),UserDoc(role,uid)));
        return r.data() as BasicInfoDoc;
});

export const getUserAgcFbData_client=cache(async(uid:string,agcid:string,role:RoleNum)=>{
    const r = await getDoc(doc(getFirestore(app),UsersAgcDataDoc(role,uid,agcid)));
    return (r.data()??{}) as Omit<RcpAgcInfoDoc,'status'>&Omit<EDAgcInfoDoc,'status'>&{status:number};
});

export const getUserAlgoData_client=cache(async(uid:string,role:RoleNum)=>{
    const r = await algo_client.initIndex(roles[role].id).getObject<EDRec|RcpRec>(uid);
    return r;
});


export const getEDListsData_client=cache(async(uid:string)=>{
    const r = await getDocs(EDListsRef(uid));
    return r.docs.map(v=>({...v.data(),id:v.id} as EDList));
});

