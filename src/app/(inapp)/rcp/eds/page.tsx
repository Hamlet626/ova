'use client'
import { PageHeader } from "@/components/ThemeRegistry/theme_consts";
import { algo_client } from "@/utils/algolia";
import { Box, Button, Stack, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
    Configure,
  } from "react-instantsearch";
import { Add, PeopleOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LOStack } from "@/components/layouts/layout_stack";
import { EDsHits } from "../../agc/eds/ed_tile";
import { OtherFilters } from "../../agc/eds/other_filters";
import { Searcher } from "../../agc/eds/searcher";
import { SortBy } from "../../agc/eds/sorter";

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
            <Typography sx={PageHeader} flexGrow={2}>All Egg Donors</Typography>
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
                <Box flexGrow={8}>
                    <OtherFilters/>
                </Box>
            </LOStack>
          <Box height={16}/>

          <EDsHits/>
        
        </Stack>
    </InstantSearchNext>;
}
