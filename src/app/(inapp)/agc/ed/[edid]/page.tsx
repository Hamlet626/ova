import { neutral96, outline } from "@/components/ThemeRegistry/theme_consts";
import { BackButton } from "@/components/back_button";
import { LOStack } from "@/components/layouts/layout_stack";
import { RoleNum } from "@/utils/roles";
import { getBasicFbData, getFormData } from "@/utils/server_data_getter/utils";
import { BorderColor, HistoryToggleOff, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Chip, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";

export default async function EDProfile({params}:{params: { edid: string }}){
    // const basicInfo=await getBasicFbData(params.edid,RoleNum.ED);
    // const formData=await getFormData(params.edid,RoleNum.ED);

    return <Stack direction='row' height='100%' width='100%' alignContent={'stretch'}>
            <Stack flexGrow={1} pl={10} pr={3} pt={3} alignItems={'stretch'}>
                <Stack direction={'row'} alignItems={'center'}>
                    <BackButton text="All Donors" link="/agc/eds"/>
                    <Box flexGrow={1}/>
                    <ButtonGroup variant="outlined">
                    <Button startIcon={<Remove/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Remove</Typography>
                    </Button>
                    <Button startIcon={<HistoryToggleOff/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Log</Typography>
                    </Button>
                    <Button startIcon={<BorderColor/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Edit</Typography>
                    </Button>
                    </ButtonGroup>
                </Stack>
                <Box height={16}/>
                <BasicInfoBloc info={{}}/> 
            </Stack>
            <Paper sx={{width:'calc((100vw - 136px)/6 + 56px )',height:'100%'}} elevation={24}>
                <List>
                    <ListItem>test</ListItem>
                    <Divider/>
                    <ListItem>test1</ListItem>
                    <Divider/>
                </List>
            </Paper>
        </Stack>
}

const BasicInfoBloc=({info}:any)=>{
    return <Stack direction={'row'}>
        <Avatar sx={{height:'193px',width:'193px'}}>
            <Image src={info.avatar} alt={`${info.name}'s avatar`}
            width={193} height={193} objectFit='cover'/>
        </Avatar>
        <Box width={24}/>
        <Grid2 container rowSpacing={24} columnSpacing={16}>
            <Grid2 xs>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography>{info.name}</Typography>
                    <Box width={21}/>
                    <Chip/>
                </Stack>
            </Grid2>
        </Grid2>
    </Stack>
}