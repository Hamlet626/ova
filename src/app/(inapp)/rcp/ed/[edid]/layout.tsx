import { neutral96, outline } from "@/components/ThemeRegistry/theme_consts";
import { BackButton } from "@/components/back_button";
import { formatPrice, formatTime } from "@/utils/formatters";
import { RoleNum } from "@/utils/roles";
import { getAgcFbData, getAlgoData, getBasicFbData, getFilesData, getFormData } from "@/utils/server_data_getter/utils";
import { Avatar, Box, Button, ButtonGroup, Chip, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCliId_Server } from "@/utils/clinic_id/server";
import { EDViewerContentTabs } from "./content_tabs";
import { EDTraitsSearcher } from "./ed_traits_searcher";
import { RightMenuTile } from "@/app/_shared/_ed/_detail/right_menu_tile";
import { PhotosCarousel } from "./photos_carousel";

export default async function EDProfile({params,children}:{params: { edid: string },children: ReactNode}){
    
    const [basicInfo,algoData,agcInfo,formData,filesData]=await Promise.all([
        getBasicFbData(params.edid,RoleNum.ED),
        getAlgoData(params.edid,RoleNum.ED),
        getAgcFbData(params.edid,getCliId_Server()!,RoleNum.ED),
        getFormData(params.edid,RoleNum.ED),
        getFilesData(params.edid,RoleNum.ED)
    ]);

    const edInfo={...basicInfo,...agcInfo};
    const photos=(filesData.filter(v=>v.id==='photos')?.[0]??{}).files;

    return <Stack direction='row' height='100%' width='100%' alignContent={'stretch'}>
            <Stack flexGrow={1} alignItems={'stretch'} sx={{overflowY:'auto'}}>
                <Box position={'relative'} height={274}>
                    <Stack position={'absolute'} left={0} right={0}>
                        <PhotosCarousel photos={photos?Object.entries(photos).map(et=>et[0]):[]}/>
                    </Stack>
                    <div style={{background: 'linear-gradient(to top, black, transparent)',zIndex:1,position:'absolute',bottom:0,right:0,left:0}}>
                        <Stack direction={'row'} pb={'21px'}>
                            <Box width={32}/>
                            <Avatar sx={{height:'106px',width:'106px'}} alt={basicInfo.name}>
                                {basicInfo.avatar==null?undefined:<Image src={basicInfo.avatar} alt={basicInfo.name} fill/>}
                            </Avatar>
                            <Box width={24}/>
                            <Stack alignItems={'start'}>
                                <Typography variant="h5" color={'white'}>{basicInfo.name}</Typography>
                                <Box height={8}/>
                                {agcInfo.price!=null && <Chip label={formatPrice(agcInfo.price)} color="primary"/>}
                            </Stack>
                        </Stack>
                    </div>
                    <BackButton text={"Home"} link={"/rcp/eds"} sx={{top:21,left:32,color:'white',position:'absolute',zIndex:1}}/>
                </Box>
                <EDViewerContentTabs edid={params.edid}>
                    {children}
                </EDViewerContentTabs>
            </Stack>
            <Paper sx={{width:'calc((100vw - 136px)/4 + 56px )', borderRadius:0, zIndex:2}} elevation={24}>
                <List>
                    {[<RightMenuTile title="Traits">
                        <EDTraitsSearcher tags={algoData.tags??[]as any}/>
                        </RightMenuTile>,
                    ].flatMap(c=>[c,<Divider sx={{my:'24px'}}/>])}
                </List>
            </Paper>
        </Stack>
}
