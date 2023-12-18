import NextAuth, {User} from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {UserRef, serverInitFirebase} from "@/utils/firebase/firebase_server";
import {auth} from "firebase-admin";
import {cliAuth} from "@/utils/firebase/firebase_client";
import { RoleNum, roles } from "@/utils/roles";
import { EDRec, RcpRec, agc_facet, algo_client } from "@/utils/algolia";
import { EDStatus, RcpStatus } from "@/utils/types/status";
import { getCliId_Server } from "@/utils/clinic_id/server";


serverInitFirebase();

export const authOptions : NextAuthOptions = {
    pages: {
        signIn: '/signin',
        newUser: '/onboard'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials,req):Promise<User|null>{
                return await signInWithEmailAndPassword(cliAuth, (credentials as any).email || '', (credentials as any).password || '')
                    .then(async userCredential => {
                        if (userCredential.user) {
                            return await getUserSessionInfo(userCredential.user.uid);
                        }
                        return null;
                    });
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            return {...token,...(user??{})};
        },
        async session({session, token, user}){
            if(session.user)session.user=token;
            // UserRef(session.user?.role!,session.user?.id!).set({lastLogin:(Date.now()/1000>>0)},{merge:true});
            return session;
        }
    }
}

const getUserSessionInfo=async (id:string):Promise<User>=>{
    const r = await auth().getUser(id);
    const basicInfo:User={
        id:id,
        email:r.email??null,
        image:r.photoURL??null,
        name:r.displayName??null,
        phone:r.phoneNumber??null,
        fbPath:r.customClaims!.path??null,
        role:r.customClaims!.role
    };

    const roleKey=roles[basicInfo.role].id;

    if(basicInfo.role===RoleNum.Agc){
        return basicInfo;
    }
    
    const clinicID=getCliId_Server();
    if(basicInfo.role===RoleNum.ED||basicInfo.role===RoleNum.Rcp){
        const algoRecord=await algo_client.initIndex(`${roleKey}`).getObject<EDRec|RcpRec>(id);
        let agency_ids=algoRecord[agc_facet]??[];
        
        
        if(clinicID!=null&&!agency_ids.includes(clinicID)){
            agency_ids=[...agency_ids,clinicID];
            await algo_client.initIndex(`${roleKey}`).partialUpdateObject({
                [agc_facet]: {
                    _operation: 'AddUnique',
                    value: clinicID,},
                agencies:{...algoRecord.agencies,
                    [clinicID]:{status:basicInfo.role===RoleNum.ED?EDStatus.filling_Form:RcpStatus.general}},
                objectID: id,
              });
        }
        basicInfo.agencies=agency_ids;
    } 
    ///Rcp now has same algolia & fb data structure as EDs
    else if(false && basicInfo.role===RoleNum.Rcp){
        let agencies=(await algo_client.initIndex(`${roleKey}`).getObject<RcpRec>(id)).agencies;
        if(clinicID!=null&&!agencies.includes(clinicID)){
            agencies=[...agencies,clinicID];
            await algo_client.initIndex(`${roleKey}`).partialUpdateObject({
                agencies: {
                  _operation: 'AddUnique',
                  value: clinicID,},
                objectID: id,
              });
        }
        basicInfo.agencies=agencies;
    }

    return basicInfo;
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
