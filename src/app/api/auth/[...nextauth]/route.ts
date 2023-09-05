import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {serverInitFirebase} from "@/utils/firebase/firebase_server";
import {auth} from "firebase-admin";
import {cliAuth} from "@/utils/firebase/firebase_client";


serverInitFirebase();

export const authOptions : NextAuthOptions = {
    pages: {
        signIn: '/signin'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials,req):Promise<any>{
                return await signInWithEmailAndPassword(cliAuth, credentials.email || '', credentials.password || '')
                    .then(async userCredential => {
                        if (userCredential.user) {
                            const r = await auth().getUser(userCredential.user.uid);
                            console.log(r);
                            return {...r,role:0};
                        }
                        return null;
                    })
                    .catch(error => (console.log(error)))
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            return {...token,...user};
        },
        async session({session, token, user}){
            if(session.user)session.user=token;
            return session;
        }
    }
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
