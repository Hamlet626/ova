// 'use client'
import {signOut, useSession} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Typography} from "@mui/material";
import { Box, Stack } from "@mui/material";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { getFirstName } from "@/utils/formatters";
import { getCliId_Server } from "@/utils/clinic_id/server";
import { EDsTrendings } from "../../../_shared/_ed/_eds_blocks.tsx/tredings";
import { EDsRecommendsPreview } from "../../../_shared/_ed/_eds_blocks.tsx/ed_recommends";
import { AllEDs } from "./all_eds";
import { TitleNSeeAll } from "../../agc/eds/title_see_all";
import { PeopleOutline } from "@mui/icons-material";

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
            <TitleNSeeAll icon={PeopleOutline} title={"All Egg Donor"} href="/rcp/eds"/>
            <Box height={12}/>
            <AllEDs/>
        </Stack>
    )
}
