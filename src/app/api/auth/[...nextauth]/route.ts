import NextAuth, {User} from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {serverInitFirebase} from "@/utils/firebase/firebase_server";
import {auth} from "firebase-admin";
import {cliAuth} from "@/utils/firebase/firebase_client";
import { RoleNum, roles } from "@/utils/roles";
import { EDRec, RcpRec, algo_client } from "@/utils/algolia";
import { EDStatus } from "@/utils/status";
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
    if(basicInfo.role===RoleNum.ED){
        const algoRecord=await algo_client.initIndex(`${roleKey}`).getObject<EDRec>(id);
        let agencies=Object.keys((algoRecord).agencies);
        if(clinicID!=null&&!agencies.includes(clinicID)){
            agencies=[...agencies,clinicID];
            await algo_client.initIndex(`${roleKey}`).saveObject({...algoRecord,
                agencies:{...algoRecord.agencies,clinicID:{status:EDStatus.filling_Form}}});
        }
        basicInfo.agencies=agencies;
    } else if(basicInfo.role===RoleNum.Rcp){
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
