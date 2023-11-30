'use client'
import { OVA_very_soft_grey, font7, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { getCliId_Client } from "@/utils/clinic_id/client";
import { UserDoc, UsersAgcDataDoc } from "@/utils/firebase/path";
import { UserRef, UsersAgcDataRef, app } from "@/utils/firebase/firebase_client";
import { RoleNum } from "@/utils/roles";
import { Stack, CircularProgress, Typography, Chip, Box, IconButton, Divider, Card, CardMedia, CardContent, CardActionArea, CardActions } from "@mui/material";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import usePromise from "react-use-promise";
import type { Hit } from 'instantsearch.js';
import { useHits, useInfiniteHits } from 'react-instantsearch';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Face, PlaylistAdd, TrendingUp } from "@mui/icons-material";
import { useRef, useEffect } from "react";
import { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { useRouter } from "next/navigation";
import { TrendingItems, useTrendingItems } from '@algolia/recommend-react';
import { recommend_client } from "@/utils/algolia";
import { RemainedSlider } from "../../ed/[agcid]/forms/remained_slider";
import { TitleNSeeAll } from "./title_see_all";
import { useCurrentRefinements } from 'react-instantsearch';

export const EdTile=({hit,sendEvent}:{hit:Hit,sendEvent?:SendEventForHits})=>{
  
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
  
    return (
        <Card sx={{bgcolor:OVA_very_soft_grey, aspectRatio:0.7}} elevation={0}>
            <CardActionArea onClick={(event)=>{
              event.stopPropagation();
              if (user?.role!==RoleNum.Agc&&sendEvent!=null) {
                sendEvent('click',hit,'ED Clicked');
              }
              router.push(`/agc/ed/${hit.objectID}`);
            }}>
    {/* <Stack className="aa-ItemContent" alignItems={'stretch'}> */}
      <CardMedia sx={{aspectRatio: 1.7, borderTopLeftRadius:'12px', borderTopRightRadius:'12px'}}>
        {/* <Avatar style={{ position: 'relative', width: '100%', height: '156px', borderTopLeftRadius:'12px', borderTopRightRadius:'12px'}} variant="square"> */}
        {infoState==='pending'?<center><CircularProgress size={60}/></center>:
        basicInfo?.data()?.avatar==null?<center><Face/></center>:
        <Image src={basicInfo?.data()?.avatar??"https://files.slack.com/files-pri/T04ME6B48EB-F05R9QAN9AP/beautiful-girl-stadium-sports-girl-sportswear-woman-with-basketball-ball_1157-41421.jpg"} alt={hit.name} sizes='160px' fill
          style={{ objectFit: 'cover', }}/>
          }
      {/* </Avatar> */}
      </CardMedia>
      <CardContent>
      <Stack px={'12px'}>
<Box height={8}/>
      <Stack direction={'row'} justifyContent={'space-between'}>
        {hit.tags?.slice(0,2).map((v:string)=>(<Chip key={v} label={v} color='secondary'/>))}
        {hit.tags!=null&& hit.tags?.length>2 && <Chip label='...' color='secondary'/>}
      </Stack>
<Box height={8}/>
<Typography sx={font7}>
          {hit.name}
        </Typography>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='subtitle3' color='secondary'>
          {agcData?.data()?.['price']??' '}
        </Typography>
        <CardActions>
        {/* <IconButton disableRipple color="secondary"> */}
            <PlaylistAdd color='secondary'/>
        {/* </IconButton> */}
        </CardActions>
      </Stack>
<Box height={8}/>
      </Stack>
      </CardContent>
      </CardActionArea>
      {/* </Stack> */}
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
            <EdTile hit={v} sendEvent={sendEvent}/>
            </Grid2>)}
            {Array.from({length:9}).map((v,i)=>
            <Grid2 key={i} xs maxWidth={300} minWidth={250}>
            </Grid2>)}

            <Grid2 key={'last'} ref={sentinelRef} 
            xs maxWidth={300} minWidth={250}>
            </Grid2>
            {/* <li
          className="ais-InfiniteHits-sentinel"
          ref={sentinelRef}
          aria-hidden="true"
        /> */}
    </Grid2>;
}



export const EDsRecommends=({agcid}:{agcid:string})=>{

  // const { items, canRefine, refine } = useCurrentRefinements({includedAttributes:['tags']});
  // {"attribute":"tags","type":"disjunctive","value":"test","label":"test","count":9,"exhaustive":true}
  // const [recommendations,err,state]=usePromise(()=>{
  //   return recommend_client.getTrendingItems([{
  //     indexName:'ed',
  //     facetName:`agencies.${agcid}.status`,
  // }],{
  //     numericFilters:`agencies.${agcid}.status>=0`,
  //     facetFilters:items[0]?.refinements.map(v=>`tags:${v.value}`).join(' OR ')
  //   });
  // },[agcid]);

  const { recommendations, status } = useTrendingItems({
    recommendClient:recommend_client,
    indexName:'ed',
  });

  return <Stack bgcolor={neutral96} py={3} mx={-10} pl={10}>
    <Box mr={10}>
      <TitleNSeeAll icon={TrendingUp} title={"Trending Egg Donor"} href="todo"/>
      </Box>
      {/* <Typography>{JSON.stringify(items)}</Typography> */}
    <Box height={12}/>
    <RemainedSlider spacing={3}>{
      // state==='pending'?<Box/>:state==='rejected'?
      // <Typography>{JSON.stringify(err)}</Typography>:
      recommendations.map(v=>
    <Box width={'274px'}>
      <EdTile hit={v as any}/>
    </Box>
    )}</RemainedSlider>
  </Stack>

}