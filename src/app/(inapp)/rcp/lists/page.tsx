import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { getEDListsData } from "@/utils/server_data_getter/utils";
import { Box, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { EDListPreview } from "./ed_list_preview";
import { EDListCreater } from "./ed_list_creater";

export default async function EDLists({params}: { params: { listid: string } }) {
    const myid=(await getServerSession(authOptions))?.user?.id!;
    const data=await getEDListsData(myid);

    return (
        <Stack pl={3} pr={10} pt={3}>
            <Stack direction={'row'}>
                <Typography sx={PageHeader} flexGrow={1}>My List</Typography>
                <EDListCreater uid={myid}/>
            </Stack>
            <Box height={27}/>
            {data.flatMap(v=>[
            <EDListPreview key={v.id} data={v} uid={myid}/>,
            <Box height={32}/>
            ])}
        </Stack>
    )
}