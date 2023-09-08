
import {getClinic} from "@/utils/clinic_check";
import {algo_client} from "@/utils/algolia";
import {AgcRoleNum, roles} from "@/utils/roles";
import { auth, firestore} from "firebase-admin";
import { serverInitFirebase } from '@/utils/firebase/firebase_server';
import { UserRecord } from "firebase-admin/auth";
import { AgencyRef, withTime } from "@/utils/firebase/database_utils";

serverInitFirebase();

///set up user's account, so afterward on client side if signin later, it would success.
export async function POST(request: Request) {
    let {email,password,name,role,fbPath,phone}=await request.json();

    ///try get clinic info from url hostName, if it's not a clinics url, set role to agency
    const clinicId=getClinic();
    role=role??(clinicId==null?AgcRoleNum:null);

    if(role==null)
        return Response.json({error:`no role provided with clinicID '${clinicId}'`},{status:501});

    let uRec:UserRecord|null=null;
    try{
        ///set up on firebase auth
        uRec=await auth().createUser({email,password,displayName:name,phoneNumber:phone});

        const roleKey=roles[role].id;
        await auth().setCustomUserClaims(uRec.uid,{role,fbPath:`user groups/${roleKey}/users/${uRec.uid}`,phone});

        ///set up firestore + algolia
        await Promise.all([
            firestore().doc(`user groups/${roleKey}/users/${uRec.uid}`)
            .set({name,createTime:Date.now(),
                ...(clinicId==null?{}:{agency:firestore.FieldValue.arrayUnion(AgencyRef(clinicId))})
            }),
            algo_client.initIndex(`${roleKey}`).saveObject({
                objectID: uRec.uid, name, email,createTime:Date.now(),
                ...(clinicId==null?{}:{agency:[AgencyRef(clinicId)]})
            })
        ]);

        return Response.json({success:true,data:{uid:uRec.uid}});
    }catch(e: any) {
        if(uRec!=null)
        await auth().deleteUser(uRec.uid);
        return Response.json(e,{status:502});
    }
}