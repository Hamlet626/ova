import { FormField } from "@/utils/form/template";
import { Box, Input, Stack, Typography } from "@mui/material";

export default function FormField({data}:{data:FormField}){
    return <Stack>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={32}/>
        {data.type==='text'?<Input></Input>}
    </Stack>
}