import { Stack, Paper, Box } from "@mui/material";
import { ReactNode } from "react";

export const ListPageLayout=({children,listChildren}:{children:ReactNode,listChildren:ReactNode})=>{
    return <Stack direction={'row'} height='100%'>
    <Paper elevation={24} 
    sx={{width:'326px',minWidth:'326px', height:'100%', alignSelf:'stretch',px:4,pt:4, borderRadius:0, overflowY:'auto'}}>
        {listChildren}
    </Paper>
    <Box ml={3} mr={10} pt={'35px'} flex={1} height={'100%'} display={'flex'} flexDirection={'column'} sx={{position:'relative'}} >
        {children}
    </Box>
</Stack>
}