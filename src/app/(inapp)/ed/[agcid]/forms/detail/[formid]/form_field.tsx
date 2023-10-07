import { FormField } from "@/utils/form/template";
import { Box, FormHelperText, Input, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormField({data}:{data:FormField}){
    const {control, formState:{errors} }=useForm();
    return <Stack>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={32}/>
        ...{data.type==='text'?[<Input required={data.required} defaultValue={data.default}/>,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :[]}
    </Stack>
}