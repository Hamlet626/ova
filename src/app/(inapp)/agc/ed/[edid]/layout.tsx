import { neutral96, outline } from "@/components/ThemeRegistry/theme_consts";
import { BackButton } from "@/components/back_button";
import { LOStack } from "@/components/layouts/layout_stack";
import { BasicInfoDoc, GCAgcInfoDoc } from "@/utils/firebase/types";
import { formatPrice, formatTime } from "@/utils/formatters";
import { RoleNum } from "@/utils/roles";
import { getAgcFbData, getBasicFbData, getFormData } from "@/utils/server_data_getter/utils";
import { EDStatusColors, EDStatusLabel } from "@/utils/types/status";
import { BorderColor, Circle, HistoryToggleOff, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Chip, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ContentTabs } from "./content_tabs";
import { StatusSetter } from "./status_setter";
import FormProgTile from "./form_progress_tile";
import { ActionsGroup } from "./actions_group";
import { EDRecommender } from "./_ed_recommender/ed_recommender";

export default async function EDProfile({params,children}:{params: { edid: string },children: ReactNode}){
    
    const [basicInfo,agcInfo,formData]=await Promise.all([
        getBasicFbData(params.edid,RoleNum.ED),
        getServerSession(authOptions).then((s)=>getAgcFbData(params.edid,s?.user?.id!,RoleNum.ED)),
        getFormData(params.edid,RoleNum.ED)]);

        const edInfo={...basicInfo,...agcInfo};

    return <Stack direction='row' height='100%' width='100%' alignContent={'stretch'}>
            <Stack flexGrow={1} pl={10} pr={3} alignItems={'stretch'} sx={{overflowY:'auto'}}>
                <Box mt={2}/>
                <Stack direction={'row'} alignItems={'center'} pt={1} pb={'4px'}
                sx={{background:'linear-gradient(to bottom, white, rgba(255,255,255,.7))'}}
                // bgcolor={'rgba(255,255,255,.5)'}
                position={'sticky'} top={0} zIndex={1}>
                    <BackButton text="All Donors" link="/agc/eds"/>
                    <Box flexGrow={1}/>
                    <ActionsGroup/>
                    {/* <ButtonGroup variant="outlined">
                    <Button startIcon={<Remove/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Remove</Typography>
                    </Button>
                    <Button startIcon={<HistoryToggleOff/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Log</Typography>
                    </Button>
                    <Button startIcon={<BorderColor/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Edit</Typography>
                    </Button>
                    </ButtonGroup> */}
                </Stack>
                <Box mt={'12px'}/>
                <BasicInfoBloc info={edInfo} formData={formData}/> 
                <Box mt={'60px'}/>
                <ContentTabs edid={params.edid}>
                    {children}
                </ContentTabs>
            </Stack>
            <Paper sx={{width:'calc((100vw - 136px)/6 + 56px )', borderRadius:0, zIndex:2}} elevation={24}>
                <List>
                    {[<RightMenuTile title="Current Status">
                        <StatusSetter current={edInfo.status} edid={params.edid}/>
                        </RightMenuTile>,
                        <RightMenuTile title="Form Progress">
                        <FormProgTile edid={params.edid}/>
                        </RightMenuTile>,
                        <RightMenuTile title="Recommend to recipients">
                            <EDRecommender edid={params.edid}/>
                            </RightMenuTile>
                    ].flatMap(c=>[c,<Divider sx={{my:'24px'}}/>])}
                </List>
            </Paper>
        </Stack>
}

const RightMenuTile=({title,children}:{title:string,children:ReactNode})=>{
    return <ListItem>
        <Stack pl={3} pr={4} spacing={1} width={'100%'}>
            <Typography variant="subtitle2">{title}</Typography>
            {children}
            </Stack>
    </ListItem>
}

const BasicInfoBloc=<T extends BasicInfoDoc & GCAgcInfoDoc>({info,formData}:{info:T,formData:any[]})=>{
    return <Stack direction={'row'}>
        <Avatar sx={{height:'193px',width:'193px'}} alt={`${info.name}'s avatar`}>
            {info.avatar==null?undefined:<Image src={info.avatar} alt={`${info.name}'s avatar`}
            fill
            // style={{width:193,height:193}}
            // objectFit='cover'
            />}
        </Avatar>
        <Box width={24}/>
        <Grid2 container rowSpacing={3} columnSpacing={2}>
            <Grid2 xs={12}>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="h4">{info.name}</Typography>
                    <Box width={21}/>
                    {info.lastLogin!=null &&
                    <Chip label={`Last online: ${formatTime(info.lastLogin)}`} color="primary"/>}
                </Stack>
                <Grid2/>
            </Grid2>
            <Grid2 xs width={140}>
                <InfoTile title="Location" content={info.location??""}/>
            </Grid2>
            <Grid2 xs width={140}>
                <InfoTile title="Phone Number" content={formData[0]?.phone}/>
            </Grid2>
            <Grid2 xs width={140}>
                <InfoTile title="Email" content={info.email}/>
            </Grid2>
            <Grid2 xs width={140}>
                <InfoTile title="Price" content={info.price==null?'Undecided':formatPrice(info.price)}/>
            </Grid2>
        </Grid2>
    </Stack>
}

const InfoTile=({title,content}:{title:string,content:string})=>{
    return <Stack>
        <Typography variant="body2" color={'secondary'}>{title}</Typography>
        <Typography variant="body1">{content}</Typography>
    </Stack>
}