import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { font5, percCaption } from "@/components/ThemeRegistry/theme_consts";
import { formStatus, getFinishStatus } from "@/utils/form/form_utils/status";
import { RoleNum } from "@/utils/roles";
import { getFormData, getFormTemplate } from "@/utils/server_data_getter/utils";
import { ArrowForward } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography, Link, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { getServerSession } from "next-auth";
import NextLink from "next/link";

export default async function FormProgTile({edid}:{edid:string}) {
    const [formTemplate,formData]=await Promise.all([
        getServerSession(authOptions).then((s)=>getFormTemplate(s?.user?.id!)),
        getFormData(edid,RoleNum.ED)
    ]);

    const formsStatus=getFinishStatus(formTemplate,formData);
    const overallPc=formsStatus.reduce((r,v)=>r+v.stats.finished,0)/formsStatus.reduce((r,v)=>r+v.stats.all,0);
    const remained=formsStatus.filter((v)=>v.subs.remained.length>0);

    return <Stack>
        <LinearProgress value={overallPc*100}/>
        <Box height={4}/>
        <Grid2 container alignItems={'center'} justifyContent={'space-between'}>
            <Typography sx={percCaption} color={'secondary'}>{`${overallPc*100>>0}/100%`}</Typography>
            <Link sx={font5} 
            component={NextLink} href={`/agc/ed/${edid}/forms/detail/${remained[0].index}?section=${encodeURIComponent(remained[0].subs.remained[0])}`}
            color={'text.primary'}
            >Continue </Link>
             </Grid2>
    </Stack>
}