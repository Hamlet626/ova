
import { auth, firestore} from "firebase-admin";
import { AgcRoleNum, EDRoleNum, RcpRoleNum, roles } from "../roles";

export const AgencyRef=(id:string)=>{
    const roleKey=roles[AgcRoleNum].id;
    return firestore().doc(`user groups/${roleKey}/users/${id}`);
}

// export const EDRef=(id:string)=>{
//     const roleKey=roles[EDRoleNum].id;
//     return firestore().doc(`user groups/${roleKey}/users/${id}`);
// }

// export const RcpRef=(id:string)=>{
//     const roleKey=roles[RcpRoleNum].id;
//     return firestore().doc(`user groups/${roleKey}/users/${id}`);
// }

export const withTime=(data:any)=>{
    data.createTime??=Date.now();
    data.editTime=Date.now();
    return data;
}