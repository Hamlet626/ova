import { initializeApp, getApps, cert } from 'firebase-admin/app';
import {RoleNum, roles } from "../roles";
import { firestore } from 'firebase-admin';
import { UserDoc } from './path';

const firebaseAdminConfig = {
    credential:
        ///not using the file inside the project, due to the complexity of passing the key file
        // cert(process.env.FIREBASE_SECRET_KEY)

        cert({
            projectId: "...",
            clientEmail: "...gserviceaccount.com",
            privateKey: "-----BEGIN PRIVATE KEY-----\n...."
        })
}

export function serverInitFirebase() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}

export const UserRef=(role:RoleNum,id:string)=>{
    return firestore().doc(UserDoc(role,id));
}

export const AgencyRef=(id:string)=>UserRef(RoleNum.Agc,id);

export const UsersAgcDataRef=(role:RoleNum,id:string,agcId:string)=>
UserRef(role,id).collection("agc data").doc(agcId);


export const withTime=(data:any)=>{
    data.createTime??=Date.now();
    data.editTime=Date.now();
    return data;
}
