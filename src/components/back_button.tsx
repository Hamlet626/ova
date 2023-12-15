import { Stack, SxProps, Typography } from "@mui/material";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";
import { nameLabel } from "@/components/ThemeRegistry/theme_consts";


export const BackButton=({text,link,sx}:{text:string,link:string,sx?:SxProps})=>{
    return <Stack direction={'row'} spacing={'10px'} component={Link} href={link} sx={sx}>
        <ArrowBackIos/>
        <Typography sx={nameLabel}>{text}</Typography>
    </Stack>;
}