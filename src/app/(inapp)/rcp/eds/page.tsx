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
import { OtherFilters } from "../../agc/eds/other_filters";
import { Searcher } from "../../agc/eds/searcher";
import { SortBy } from "../../agc/eds/sorter";
import { EDsHits } from "@/app/_shared/_ed/_eds_blocks.tsx/hits";

export default function EDs(){
  const router=useRouter();

    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    insights={true}
    future={{preserveSharedStateOnUnmount: true,}}
    >
      <Configure hitsPerPage={10}/>
        <Stack mx={10}>
          <Box height={20}/>
          <LOStack>
            <Typography sx={PageHeader} flexGrow={2}>All Egg Donors</Typography>
            <Box flexGrow={10}>
              <Searcher/>
            </Box>
          </LOStack>
          
          <Box height={12}/>
            <LOStack>
              <SortBy items={[
                {label:'Most Relevant',value:'ed'},
                {label:'Create Date',value:'ed_createtime_desc'}]}/>
                <Box bgcolor={'red'} flex={'auto'} overflow={'hidden'}>
                    <OtherFilters/>
                </Box>
            </LOStack>
          <Box height={16}/>

          <EDsHits/>
        
        </Stack>
    </InstantSearchNext>;
}
