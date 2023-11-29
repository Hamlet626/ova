import { Typography } from "@mui/material";

export default function Files({params}:{params: { edid: string }}){
    return <Typography>{params.edid}</Typography>;
}