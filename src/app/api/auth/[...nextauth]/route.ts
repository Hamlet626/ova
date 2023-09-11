import NextAuth, {User} from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {serverInitFirebase} from "@/utils/firebase/firebase_server";
import {auth} from "firebase-admin";
import {cliAuth} from "@/utils/firebase/firebase_client";


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
                            const r = await auth().getUser(userCredential.user.uid);
                            return {
                                id:r.uid,
                                email:r.email??null,
                                image:r.photoURL??null,
                                name:r.displayName??null,
                                phone:r.phoneNumber??null,
                                fbPath:r.customClaims?.path??null,
                                role:r.customClaims?.role??null
                            };
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
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
