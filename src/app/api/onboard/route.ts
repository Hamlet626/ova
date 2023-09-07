import {NextRequest, NextResponse} from 'next/server';
import {getClinic} from "@/utils/clinic_check";
import {getAuth} from "firebase-admin/lib/auth";
import {getFirestore} from "firebase-admin/lib/firestore";
import {algo_client} from "@/utils/algolia";
import {roles} from "@/utils/roles";

export async function POST(request: NextRequest, response: NextResponse) {
    const {email,password,name,role,fbPath,phone}=await request.json();
    const clinicId=getClinic();
    if(clinicId!=null&&role==null)
        return NextResponse.status(501).send({error:`no role provided with clinicID '${clinicId}'`});
    const uRec=await getAuth().createUser({email,password,displayName:name,phoneNumber:phone});
    await getAuth().setCustomUserClaims(uRec.uid,{role:clinicId==null?0:role,fbPath,phone});
    const roleKey=roles[role];
    await Promise.all([
        getFirestore().doc(`user groups/${roleKey}/users/${uRec.uid}`).set({name}),
        algo_client.initIndex(`${roleKey}`).saveObject({objectID: uRec.uid, name})
    ]);
    return NextResponse.send({success:true,data:{uid:uRec.uid}});
}