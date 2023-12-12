import { Box, Paper, Stack, Typography } from "@mui/material";
import EDFormTitles from "./form_titles";
import { PageHeader, } from "@/components/ThemeRegistry/theme_consts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getFormData } from "../../../../../../../utils/server_data_getter/utils";
import { BackButton } from "@/components/back_button";
import { ListPageLayout } from "@/components/layouts/list_page_layout";

export default async function FormIndex({children, params}: { children: React.ReactNode, params: { agcid: string, formid:string } }) {
    
    const user=(await getServerSession(authOptions))!.user!;
    
    const myRole=user.role!;
    
    const formData=await getFormData(user.id,myRole);

    return <ListPageLayout listChildren={
        <>
            <BackButton text="Form Dashboard" link={`/ed/${params.agcid}/forms`}/>
            <Box height={32}/>
            <Typography sx={PageHeader}>Form</Typography>
            <Box height={60}/>
            <EDFormTitles formid={params.formid} edid={user.id} data={formData}
            pathPrefix={`/ed/${params.agcid}/forms/detail`}/>
        </>}>
        {children}
        </ListPageLayout>;
}