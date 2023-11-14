import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";
import { font7 } from "@/components/ThemeRegistry/theme_consts";


export const BackButton=({text,link}:{text:string,link:string})=>{
    return <Link href={link} passHref>
    <Stack direction={'row'} spacing={'10px'}>
        <ArrowBackIos/>
        <Typography sx={font7}>{text}</Typography>
    </Stack>
</Link>;
}