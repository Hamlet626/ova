// 'use client'
import {signOut, useSession} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/signin');
  //   },
  // });

    const session=await getServerSession(authOptions);

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <Signin/>
    // </main>
      <div className="p-8">
        {/*<div>{session?.data?.user?.email }</div>*/}
          <div>{JSON.stringify(session) }</div>
        {/*<button onClick={() => {signOut()}}>Logout</button>*/}
      </div>
  )
}
