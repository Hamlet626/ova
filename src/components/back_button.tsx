import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";
import { font7 } from "@/components/ThemeRegistry/theme_consts";


export const BackButton=({text,link}:{text:string,link:string})=>{
    return <Stack direction={'row'} spacing={'10px'} component={Link} href={link}>
        <ArrowBackIos/>
        <Typography sx={font7}>{text}</Typography>
    </Stack>;
}