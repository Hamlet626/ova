'use client'
import { OVA_very_soft_grey, font7, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { UserRef, UsersAgcDataRef, app } from "@/utils/firebase/firebase_client";
import { RoleNum, roles } from "@/utils/roles";
import { Stack, CircularProgress, Typography, Chip, Box, IconButton, Divider, Card, CardMedia, CardContent, CardActionArea, CardActions, Skeleton, Avatar } from "@mui/material";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import usePromise from "react-use-promise";
import type { Hit } from 'instantsearch.js';
import { useHits, useInfiniteHits } from 'react-instantsearch';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Face, PlaylistAdd, TrendingUp } from "@mui/icons-material";
import { useRef, useEffect, MouseEventHandler } from "react";
import { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { useRouter } from "next/navigation";
import { TrendingItems, useTrendingItems } from '@algolia/recommend-react';
import { EDRec, agc_facet, algo_client, click_ED_event, recommend_client } from "@/utils/algolia";
import { RemainedSlider } from "../../ed/[agcid]/forms/remained_slider";
import { TitleNSeeAll } from "./title_see_all";
import { useCurrentRefinements } from 'react-instantsearch';
import { formatPrice } from "@/utils/formatters";
import Link from "next/link";
import aa from "search-insights";

export const EdAlgoTile=({hit,sendEvent}:{hit:Hit,sendEvent?:SendEventForHits})=>{
  
    const user=useSession({required:true}).data?.user;
    const agcId=getCliId_Client(user?.role,user?.id)!;
    const [basicInfo,infoError,infoState]=usePromise(
      ()=>getDoc(UserRef(RoleNum.ED,hit.objectID)),
      [hit.objectID]);
    const [agcData,agcError,agcState]=usePromise(
      ()=>{ 
        if(!agcId)return Promise.resolve(null);
        return getDoc(UsersAgcDataRef(RoleNum.ED,hit.objectID,agcId));
    },
      [hit.objectID,agcId]);
      const router=useRouter();
  
      return <LoadingEDTile 
      avatar={infoState==='pending'?undefined:basicInfo?.data()?.avatar}
      name={hit.name}
      tags={hit.tags}
      price={agcState==='pending'?undefined:agcData?.data()?.price}
      onClick={(event)=>{
        event.stopPropagation();
        if (user?.role!==RoleNum.Agc&&sendEvent!=null) {
          sendEvent('click',hit,click_ED_event);
        }
        router.push(`/agc/ed/${hit.objectID}`);
      }}
      />
      
    }

export const EdFbTile=({edid}:{edid:string})=>{
  const user=useSession({required:true}).data?.user;
  const agcId=getCliId_Client(user?.role,user?.id)!;

  const [algoInfo,algoError,algoState]=usePromise(
    ()=>algo_client.initIndex(roles[RoleNum.ED].id).getObject<EDRec>(edid),
    [edid]);
  const [basicInfo,infoError,infoState]=usePromise(
      ()=>getDoc(UserRef(RoleNum.ED,edid)),
      [edid]);
  
    const [agcData,agcError,agcState]=usePromise(
      ()=>{ 
        if(!agcId)return Promise.resolve(null);
        return getDoc(UsersAgcDataRef(RoleNum.ED,edid,agcId));
    },
      [edid,agcId]);
      const router=useRouter();

      return <LoadingEDTile 
      avatar={infoState==='pending'?undefined:basicInfo?.data()?.avatar}
      name={infoState==='pending'?undefined:basicInfo?.data()?.name}
      tags={algoState==='pending'?undefined:algoInfo?.tags}
      price={agcState==='pending'?undefined:agcData?.data()?.price}
      onClick={(event)=>{
        event.stopPropagation();
        aa('clickedObjectIDs', {index:roles[RoleNum.ED].id,
          eventName:click_ED_event,objectIDs:[edid]});
        router.push(`/agc/ed/${edid}`);
      }}
      />
}

export const LoadingTile=()=>{
  return <Card sx={{bgcolor:OVA_very_soft_grey, aspectRatio:0.752}} elevation={0}>
      <CardMedia sx={{aspectRatio: 1.2, borderTopLeftRadius:'12px', borderTopRightRadius:'12px'}}>
        <Skeleton variant='rounded' height={'100%'}/>
      </CardMedia>
      <CardContent>
      <Stack px={'12px'}>
        <Box height={8}/>
        <Skeleton variant='circular' sx={{alignSelf:'start'}} width={36}/>
        <Box height={8}/>
        <Typography sx={font7}>
          <Skeleton/>
        </Typography>

        <Typography variant='subtitle3'>
        <Skeleton/>
        </Typography>
        <Box height={8}/>
      </Stack>
      </CardContent>
      </Card>
}

export const LoadingEDTile=({avatar,name,tags,price,href,onClick}:
  {avatar?:string|null,name?:string|null,tags?:string[],price?:number|null,href?:string,onClick?:MouseEventHandler})=>{
  const avaComp=<CardMedia sx={{aspectRatio: 1.2, borderTopLeftRadius:'12px', borderTopRightRadius:'12px'}}>
  <Avatar style={{ position: 'relative', width: '100%', height: '100%'}} variant="square">
  {avatar===undefined?<Skeleton variant='rounded' height={'100%'}/>:
  avatar===null?<center><Face/></center>:
  <Image src={avatar} alt={name??''} fill objectFit="cover" />
  }
</Avatar>
</CardMedia>;

  return (
    <Card sx={{bgcolor:OVA_very_soft_grey, aspectRatio:0.752}} elevation={0}>
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
<Typography sx={font7}>
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

export const EDsHits=()=>{
    // const { hits, results, sendEvent } = useHits();
    const { hits, isLastPage, showMore, bindEvent, sendEvent } = useInfiniteHits({showPrevious:true});
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            if(showMore!=null)
              showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);


    return <Grid2 container rowSpacing={'20px'} columnSpacing={3}>
        {hits.map((v,i)=>
        <Grid2 key={i} xs maxWidth={300} minWidth={250}>
            <EdAlgoTile hit={v} sendEvent={sendEvent}/>
            </Grid2>)}
            {Array.from({length:9}).map((v,i)=>
            <Grid2 key={i} xs maxWidth={300} minWidth={250}>
            </Grid2>)}

            <Grid2 key={'last'} ref={sentinelRef} 
            xs maxWidth={300} minWidth={250}>
            </Grid2>
    </Grid2>;
}



export const EDsTrendings=({agcid}:{agcid:string})=>{

  const { recommendations, status } = useTrendingItems({
    recommendClient:recommend_client,
    indexName:'ed',
    facetName:agc_facet,facetValue:agcid
  });

  if(status!=='loading'&&recommendations.length===0)return null; 
  return <Stack bgcolor={neutral96} py={3} mx={-10} pl={10}>
    <Box mr={10}>
      {status==='loading'?<Skeleton width={36}/>:
      <TitleNSeeAll icon={TrendingUp} title={"Trending Egg Donor"} href="todo"/>}
      </Box>
      {/* <Typography>{JSON.stringify(items)}</Typography> */}
    <Box height={12}/>
    <RemainedSlider>{
      status==='loading'?
      [1,2,3].map(v=><Box width={'274px'}><LoadingEDTile/></Box>):
      recommendations.map(v=>
        <Box width={'274px'}>
          <EdAlgoTile hit={v as any}/>
          </Box>
          )}</RemainedSlider>
  </Stack>

}