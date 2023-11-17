
import {algo_client} from "@/utils/algolia";
import {RoleNum, roles} from "@/utils/roles";
import { auth, firestore} from "firebase-admin";
import { serverInitFirebase } from '@/utils/firebase/firebase_server';
import { UserRef } from "@/utils/firebase/firebase_server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

serverInitFirebase();

///set up user's account, so afterward on client side if signin later, it would success.
export async function POST(request: Request) {
    const user=(await getServerSession(authOptions))?.user;
    if(!user?.id)return Response.json({error:`User nor signed in'`},{status:501});

    let {email,name,avatar,phone}=await request.json();

    await Promise.all([
        auth().updateUser(user.id,{email,displayName:name,phoneNumber:phone,photoURL:avatar}),
        ...((avatar??name??email) ? [
            UserRef(user.role,user.id).set({
                ...(avatar!=null?{avatar}:{}),
                ...(name!=null?{name}:{}),
                ...(email!=null?{email}:{})
            },{merge:true})
        ]:[]),
        ...(name ? [algo_client.initIndex(`${roles[user.role].id}`).partialUpdateObject({
            objectID: user.id, name })]:[]),
    ]);
    
    return Response.json({success:true});
}
