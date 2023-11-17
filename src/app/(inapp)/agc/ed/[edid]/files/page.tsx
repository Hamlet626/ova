import { Typography } from "@mui/material";

export default function Files({params}:{params: { edid: string }}){
    console.log('here');
    return <Typography>{params.edid}</Typography>;
}