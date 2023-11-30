import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import Link from "next/link";
import { ElementType } from "react";

export const TitleNSeeAll=({icon,title,href}:{icon:ElementType,title:string,href?:string})=>{
    return <Stack direction={'row'} alignItems={'center'}>
    <SvgIcon component={icon} color="secondary"/>
    <Box width={8}/>
    <Typography variant="subtitle2">{title}</Typography>
    <Box flexGrow={1}/>
    {href && <Typography variant="body2" component={Link} href={href}>See All</Typography>}
  </Stack>;
  }