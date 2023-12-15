import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { getEDListsData } from "@/utils/server_data_getter/utils";
import { Box, Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { Create, Delete, Edit, MoreHoriz, MoreVert } from "@mui/icons-material";
import { EDList } from "@/utils/firebase/types";
import { PopupComp } from "@/components/popup_comp";
import { MouseEventHandler, ReactNode } from "react";
import { ConfirmDialog } from "@/components/api_process/confirm_dialog";
import { EDListRef } from "@/utils/firebase/firebase_client";
import { roles, RoleNum } from "@/utils/roles";
import { deleteDoc } from "firebase/firestore";
import router from "next/router";
import { EDListPreview } from "./ed_list_preview";
import { EDListCreater } from "./ed_list_creater";

export default async function EDLists({params}: { params: { listid: string } }) {
    const myid=(await getServerSession(authOptions))?.user?.id!;
    const data=await getEDListsData(myid);

    return (
        <Stack pl={3} pr={10} pt={3}>
            <Stack direction={'row'}>
                <Typography sx={PageHeader}>My List</Typography>
                <EDListCreater uid={myid}/>
            </Stack>
            <Box height={27}/>
            {data.map(v=><EDListPreview data={v} uid={myid}/>)}
        </Stack>
    )
}