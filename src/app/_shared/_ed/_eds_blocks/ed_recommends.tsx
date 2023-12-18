import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCliId_Server } from "@/utils/clinic_id/server";
import { RoleNum } from "@/utils/roles";
import { getAgcFbData } from "@/utils/server_data_getter/utils"
import { Box, Stack } from "@mui/material";
import { getServerSession } from "next-auth";
import { TitleNSeeAll } from "../../../(inapp)/agc/eds/title_see_all";
import { Recommend } from "@mui/icons-material";
import { RemainedSlider } from "../../../(inapp)/ed/[agcid]/forms/remained_slider";
import { EdFbTile } from "../_ed_tiles/fb_tile";

export const EDsRecommendsPreview=async ({padding=80*2}:{padding?:number})=>{
    const session=await getServerSession(authOptions);
    const agcid=getCliId_Server()!;
    const agcInfo=await getAgcFbData(session?.user?.id!,agcid,RoleNum.Rcp);

    if((agcInfo.recommends??[]).length===0)return null;
    return <Stack>
        <TitleNSeeAll title="Recommended Egg Donor" icon={Recommend}/>
        <Box height={12}/>
        <RemainedSlider>
            {agcInfo.recommends!.map(v=>(
                <EdFbTile key={v} edid={v} constraint={{padding:padding}}/>))}
        </RemainedSlider>
    </Stack>
}