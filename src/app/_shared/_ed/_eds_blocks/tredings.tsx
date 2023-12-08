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
import { useRef, useEffect, MouseEventHandler, useContext } from "react";
import { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { useRouter } from "next/navigation";
import { TrendingItems, useTrendingItems } from '@algolia/recommend-react';
import { EDRec, agc_facet, algo_client, click_ED_event, recommend_client } from "@/utils/algolia";
import { RemainedSlider } from "../../../(inapp)/ed/[agcid]/forms/remained_slider";
import { TitleNSeeAll } from "../../../(inapp)/agc/eds/title_see_all";
import { useCurrentRefinements } from 'react-instantsearch';
import { formatPrice } from "@/utils/formatters";
import Link from "next/link";
import aa from "search-insights";
import useWindowDimensions from "@/utils/hooks/use_window_dimensions";
import { AppLayoutContext } from "@/components/banner_menu/ed_rcp";
import { EdAlgoTile } from "../_ed_tiles/algo_tile";
import { LoadingEDTile } from "../_ed_tiles/loading_tile";
import { calcEDTileWidth } from "./consts";



export const EDsTrendings=({agcid, padding=80*2}:{agcid:string,padding?:number})=>{

  const { recommendations, status } = useTrendingItems({
    recommendClient:recommend_client,
    indexName:'ed',
    facetName:agc_facet,facetValue:agcid
  });
  const {width}=typeof window !== 'undefined'?useWindowDimensions():{width:0};
  const {menuWidth}=useContext(AppLayoutContext)!;

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
      [1,2,3].map(v=><Box width={calcEDTileWidth(width-menuWidth-padding)}><LoadingEDTile/></Box>):
      recommendations.map(v=>
        <Box width={calcEDTileWidth(width-menuWidth-padding)}>
          <EdAlgoTile hit={v as any}/>
          </Box>
          )}</RemainedSlider>
  </Stack>

}