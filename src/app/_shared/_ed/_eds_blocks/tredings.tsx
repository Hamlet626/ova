'use client'
import { neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { Stack, Box, Skeleton, Avatar } from "@mui/material";

import { Face, PlaylistAdd, TrendingUp } from "@mui/icons-material";
import { useContext } from "react";
import { TrendingItems, useTrendingItems } from '@algolia/recommend-react';
import { EDRec, agc_facet, recommend_client } from "@/utils/algolia";
import { RemainedSlider } from "../../../(inapp)/ed/[agcid]/forms/remained_slider";
import { TitleNSeeAll } from "../../../(inapp)/agc/eds/title_see_all";
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
  const {width}=useWindowDimensions();
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
      [1,2,3].map(v=><Box width={calcEDTileWidth(width-menuWidth-padding)}><LoadingEDTile transparent/></Box>):
      recommendations.map(v=>
        <Box width={calcEDTileWidth(width-menuWidth-padding)}>
          <EdAlgoTile hit={v as any} transparent/>
          </Box>
          )}</RemainedSlider>
  </Stack>

}