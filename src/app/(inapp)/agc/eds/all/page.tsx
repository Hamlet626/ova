'use client'
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { algo_client } from "@/utils/algolia";
import { Box, Button, Stack, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Searcher } from "../searcher";
import {
    Configure,
  } from "react-instantsearch";
import { Add, PeopleOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { EDsHits, } from "../ed_tile";
import { SortBy } from "../sorter";
import { LOStack } from "@/components/layouts/layout_stack";
import { StateFilter } from "../state_filter";
import { OtherFilters } from "../other_filters";
import { TitleNSeeAll } from "../title_see_all";

export default function EDs(){
  const router=useRouter();

    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    insights={true}
    future={{preserveSharedStateOnUnmount: true,}}
    >
      <Configure hitsPerPage={10}/>
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

          <Box height={24}/>
          <EDsHits/>
        
        </Stack>
 
        {/* <div className="container wrapper">
          <div>
            <RefinementList attribute="brand" />
          </div>
          <div>
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </div> */}
    </InstantSearchNext>;
}
