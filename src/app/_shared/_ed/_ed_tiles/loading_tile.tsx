import { OVA_very_soft_grey, nameLabel } from "@/components/ThemeRegistry/theme_consts";
import { formatPrice } from "@/utils/formatters";
import { Face, PlaylistAdd } from "@mui/icons-material";
import { CardMedia, Avatar, Skeleton, Card, CardActionArea, CardContent, Stack, Chip, Typography, IconButton, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

export const LoadingEDTile=({avatar,name,tags,price,href,onClick,transparent=false}:
    {avatar?:string|null,name?:string|null,tags?:string[],price?:number|null,href?:string,onClick?:MouseEventHandler,transparent?:boolean})=>{
    const avaComp=<CardMedia sx={{aspectRatio: 1.2,
    ...(transparent?{borderRadius:'12px'}:{borderTopLeftRadius:'12px', borderTopRightRadius:'12px',})}}>
    <Avatar style={{ position: 'relative', width: '100%', height: '100%', ...(transparent?{borderRadius:'12px'}:{})}} variant="square">
    {avatar===undefined?<Skeleton variant='rounded' height={'100%'}/>:
    avatar===null?<center><Face/></center>:
    <Image src={avatar} alt={name??''} fill objectFit="cover" />
    }
  </Avatar>
  </CardMedia>;
  
    return (
      <Card sx={{bgcolor:transparent?'transparent':OVA_very_soft_grey, aspectRatio:0.752}} elevation={0}>
        {(onClick||href) ? 
        <CardActionArea {...(href!=null?{LinkComponent:Link,href:href}:{})} onClick={onClick}>
          {avaComp}
          </CardActionArea>:
          avaComp}
        <CardContent>
          <Stack px={'12px'}>
            <Box height={8}/>
            
            <Stack direction={'row'} justifyContent={'space-between'} ml={'-4px'}>
              {tags===undefined ? [1,2].map(v=><Skeleton sx={{alignSelf:'start'}} width={36}/>):
              tags.slice(0,2).map((v:string)=>(<Chip key={v} label={v} color='secondary'/>))}
              {tags!=null&& tags?.length>2 && <Chip label='...' color='secondary'/>}
              </Stack>
  <Box height={8}/>
  <Typography sx={nameLabel}>
        {name===undefined?<Skeleton/>:name}
      </Typography>
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Typography variant='subtitle3' color='secondary'>
        {price===undefined?<Skeleton/>:price===null?' ':formatPrice(price)}
      </Typography>
      <IconButton disableRipple color="secondary">
          <PlaylistAdd color='secondary'/>
      </IconButton>
    </Stack>
  <Box height={8}/>
    </Stack>
    </CardContent>
    </Card>
  );
  }