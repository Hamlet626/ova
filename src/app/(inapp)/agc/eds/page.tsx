'use client'
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { EDRec, agc_facet, algo_client } from "@/utils/algolia";
import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
    Configure,
  } from "react-instantsearch";
import { Add, PeopleOutline, } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LOStack } from "@/components/layouts/layout_stack";
import { OtherFilters } from "./other_filters";
import { SortBy } from "./sorter";
import { StateFilter } from "./state_filter";
import { TitleNSeeAll } from "./title_see_all";
import { Searcher } from "./searcher";
import { useSession } from "next-auth/react";
import { EDsHits } from "../../../_shared/_ed/_eds_blocks.tsx/hits";
import { EDsTrendings } from "../../../_shared/_ed/_eds_blocks.tsx/tredings";

export default function EDs(){
  const router=useRouter();
  const myid=useSession({required:true}).data?.user?.id!;

    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    insights={true}
    future={{preserveSharedStateOnUnmount: true,}}
    >
      <Configure hitsPerPage={10} facetFilters={`${agc_facet}:${myid}`}/>
        <Stack px={10}>
          <Box height={20}/>
          <LOStack>
            <Typography sx={PageHeader} flexGrow={2}>Egg Donor</Typography>
            <Box flexGrow={8} flexBasis={8}>
              <Searcher/>
            </Box>
            <Stack flexGrow={2} direction={'row'} alignItems={'end'}>
              <Box flexGrow={1}/>
              <Button sx={{color:'white',flexGrow:1}} 
                  variant="contained" onClick={()=>{router.push('agc/eds/create')}}
                  startIcon={<Add/>}>add ed</Button>
            </Stack>
          </LOStack>
          
          <Box height={12}/>
            <LOStack>
              <SortBy items={[
                {label:'Most Relevant',value:'ed'},
                {label:'Create Date',value:'ed_createtime_desc'}]}/>
                <StateFilter/>
            </LOStack>
          <Box height={12}/>

          <OtherFilters/>

          <Box height={18}/>
          <EDsTrendings agcid={myid}/>

          <Box height={32}/>
          <TitleNSeeAll icon={PeopleOutline} title={"All Egg Donor"} //href="/agc/eds/all"
          />
          <Box height={12}/>
          <EDsHits/>
        </Stack>
    </InstantSearchNext>;
}
