
import { auth, firestore} from "firebase-admin";
import {RoleNum, roles } from "../roles";

export const UserRef=(role:RoleNum,id:string)=>{
    const roleKey=roles[role].id;
    return firestore().doc(`user groups/${roleKey}/users/${id}`);
}

export const AgencyRef=(id:string)=>UserRef(RoleNum.Agc,id);

export const UsersAgcDataRef=(role:RoleNum,id:string,agcId:string)=>
UserRef(role,id).collection("agc data").doc(agcId);


export const withTime=(data:any)=>{
    data.createTime??=Date.now();
    data.editTime=Date.now();
    return data;
}