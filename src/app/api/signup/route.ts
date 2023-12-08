
import {getClinic} from "@/utils/clinic_id/clinic_check";
import {agc_facet, algo_client} from "@/utils/algolia";
import {RoleNum, roles} from "@/utils/roles";
import { auth, firestore} from "firebase-admin";
import { serverInitFirebase } from '@/utils/firebase/firebase_server';
import { UserRecord } from "firebase-admin/auth";
import { UserRef, UsersAgcDataRef } from "@/utils/firebase/firebase_server";
import { EDStatus, RcpStatus } from "@/utils/types/status";
import { headers } from "next/headers";
import { UserDoc } from "@/utils/firebase/path";

serverInitFirebase();

///set up user's account, so afterward on client side if signin later, it would success.
export async function POST(request: Request) {
    let {email,password,name,role,fbPath,phone}=await request.json();

    ///try get clinic info from url hostName, if it's not a clinics url, set role to agency
    const clinicId=getClinic(headers().get("host"));
    role=role??(clinicId==null?RoleNum.Agc:null);

    if(role==null)
        return Response.json({error:`no role provided with clinicID '${clinicId}'`},{status:501});

    if((role==RoleNum.ED||role===RoleNum.Rcp)&&clinicId==null)
        return Response.json({error:`no clinicID provided for role '${role}'`},{status:501});

    let uRec:UserRecord|null=null;
    try{
        ///set up on firebase auth
        uRec=await auth().createUser({email,password,displayName:name,phoneNumber:phone});

        await auth().setCustomUserClaims(uRec.uid,{role,fbPath:UserDoc(role,uRec.uid),phone});

        ///set up firestore + algolia
        await Promise.all([
            UserRef(role,uRec.uid).set({
                name,email,
                createTime:(Date.now()/1000>>0),
                // ...(clinicId==null?{}:{agency:firestore.FieldValue.arrayUnion(AgencyRef(clinicId))})
            }),
            ...(
                role===RoleNum.ED?EDSetUp(uRec.uid,name,clinicId!):
                role===RoleNum.Rcp?RcpSetUp(uRec.uid,name,clinicId!):
                AgcSetUp(uRec.uid,name,)),
        ]);

        return Response.json({success:true,data:{uid:uRec.uid}});
    }catch(e: any) {
        console.error(e);
        if(uRec!==null)
            await auth().deleteUser(uRec.uid);
        return Response.json(e,{status:502});
    }
}


const EDSetUp=(uid:string,name:string,clinicId:string)=>{
    const roleKey=roles[RoleNum.ED].id;
    return [
    UsersAgcDataRef(RoleNum.ED,uid,clinicId).set({
        status:EDStatus.filling_Form
    }),
    algo_client.initIndex(`${roleKey}`).saveObject({
        objectID: uid, name, createTime:(Date.now()/1000>>0),
        agencies:{[clinicId]:{status:EDStatus.filling_Form}},
        [agc_facet]:[clinicId]
    })];
}

const RcpSetUp=(uid:string,name:string,clinicId:string)=>{
    const roleKey=roles[RoleNum.Rcp].id;
    return [
        UsersAgcDataRef(RoleNum.Rcp,uid,clinicId).set({
            status:RcpStatus.general
        }),
    algo_client.initIndex(`${roleKey}`).saveObject({
        objectID: uid, name, createTime:(Date.now()/1000>>0),
        agencies:{[clinicId]:{status:RcpStatus.general}},
        [agc_facet]:[clinicId]
    })];
}

const AgcSetUp=(uid:string,name:string)=>{
    const roleKey=roles[RoleNum.Agc].id;
    return [
        algo_client.initIndex(`${roleKey}`).saveObject({
        objectID: uid, name, createTime:(Date.now()/1000>>0)
    })];
}