import { BackButton } from "@/components/back_button";
import { LOStack } from "@/components/layouts/layout_stack";
import { RoleNum } from "@/utils/roles";
import { getBasicFbData, getFormData } from "@/utils/server_data_getter/utils";
import { Box, Divider, List, ListItem, Paper, Stack } from "@mui/material";

export default async function EDProfile({params}:{params: { edid: string }}){
    const basicInfo=await getBasicFbData(params.edid,RoleNum.ED);
    const formData=await getFormData(params.edid,RoleNum.ED);

    return <Box px={10}>
        <LOStack height={'100%'}>
            <Stack flexGrow={8} pt={3}>
                <Stack direction={'row'}>
                    <BackButton text="All Donors" link="/agc/eds"/>
                    
                </Stack>

            </Stack>
            <Paper sx={{flexGrow:2, mr:'-80px'}}>
                <List>
                    <ListItem>test</ListItem>
                    <Divider/>
                    <ListItem>test1</ListItem>
                    <Divider/>
                </List>
            </Paper>
        </LOStack>
    </Box>
}