
import {signOut, useSession} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {Button} from "@mui/material";
import Link from "next/link";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  console.log("in page")
  console.log(session);

  const hd=headers()
  hd.forEach((v,k)=>{
    console.log(v,k);
  });

  if(session)redirect("/dashboard");

  console.log("render landing");
  return (
      // <main className="flex min-h-screen flex-col items-center justify-between p-24">
      //   <Signin/>
      // </main>
      <div className="p-8">
        <Link href={"/signin"}>sign in</Link>
        {/*<Button onClick={()=>{redirect("/signin")}}>sign in</Button>*/}
      </div>
  )
}
