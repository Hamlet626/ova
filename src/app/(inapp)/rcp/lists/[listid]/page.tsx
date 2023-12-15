import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { getEDListsData } from "@/utils/server_data_getter/utils";
import { Box, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { EDListClientContent } from "./client_content";

export default async function EDList({params}: { params: { listid: string } }) {
    const myid=(await getServerSession(authOptions))?.user?.id!;
    const data=(await getEDListsData(myid)).filter(v=>v.id===params.listid)[0];

    if(data==null)throw 'The list has been removed';

    return (
        <Box pl={3} pr={10} pt={3}>
            <EDListClientContent initialData={data} uid={myid}/>
        </Box>
    )
}
