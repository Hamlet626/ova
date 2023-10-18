// 'use client'
import {signOut, useSession} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import Grid2 from "@mui/material/Unstable_Grid2";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import logo from "@/assets/ova_logo.svg";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import ToolBar from "@mui/material/Toolbar";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default async function Home() {
    // const session = useSession({
    //   required: true,
    //   onUnauthenticated() {
    //     redirect('/signin');
    //   },
    // });
    const session=await getServerSession(authOptions);

    return (

        <AppBar position = "static">

            {/*        style={{*/}
            {/*    width: '1474px',*/}
            {/*    height: '78px',*/}
            {/*}}>*/}
            <Container maxWidth= "xl">
                <ToolBar disableGutters>
                    <Image src={logo} alt="Logo" style={{
                        width: '85px',
                        height: '27.71px',
                        position: 'static',
                        // top: '27px',
                        // left: '80px',
                    }}/>
                </ToolBar>
            </Container>
        </AppBar>

        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        //   <Signin/>
        // </main>
        //   <div className="p-8">
        //     {/*<div>{session?.data?.user?.email }</div>*/}
        //       <div>{JSON.stringify(session) }</div>
        //     {/*<button onClick={() => {signOut()}}>Logout</button>*/}
        //   </div>
    )
}
