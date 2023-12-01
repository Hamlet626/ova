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
import {Typography} from "@mui/material";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { getFirstName } from "@/utils/formatters";
import { getCliId_Server } from "@/utils/clinic_id/server";
import { EDsTrendings } from "../../agc/eds/ed_tile";
import { EDsRecommendsPreview } from "./ed_recommends";

export default async function Home() {
    // const session = useSession({
    //   required: true,
    //   onUnauthenticated() {
    //     redirect('/signin');
    //   },
    // });

    const session=await getServerSession(authOptions);
    const agcid=getCliId_Server()!;

    return (
        <Stack px={10}>
            <Box height={30}/>
            <Typography sx={PageHeader}>Welcome{session?.user?.name==null?'!':
            ', '+getFirstName(session?.user?.name!)}</Typography>
            <Box height={16}/>
            <EDsTrendings agcid={agcid}/>
            <Box height={32}/>
            <EDsRecommendsPreview/>
            <Box height={32}/>
        </Stack>
    )
}
