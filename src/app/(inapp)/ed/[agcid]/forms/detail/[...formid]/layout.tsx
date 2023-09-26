import { Box, Paper } from "@mui/material";
import EDFormTitles from "./form_titles";

export default async function FormIndex({children, params}: { children: React.ReactNode, params: { agcid: string, formid?:string } }) {
    
    // console.log(params.formid);
    // return <Box bgcolor={'red'} width={'19900px'} height={'199900px'}/>;

    return <Box display={'flex'}>
        <Paper sx={{width:'326px', alignSelf:'stretch',height:'9999px'}}>
            <EDFormTitles/>
        </Paper>
        {children}
    </Box>
}