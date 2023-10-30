'use client'
import { font3 } from "@/components/ThemeRegistry/theme_consts";
import { algo_client } from "@/utils/algolia";
import { Box, Button, Stack, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Autocomplete } from "./searcher";
import {
    Highlight,
    Hits,
    InstantSearch,
    Pagination,
    RefinementList,
    SearchBox,
  } from "react-instantsearch";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default async function EDs(){
  const router=useRouter();

    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    future={{preserveSharedStateOnUnmount: true,}}
    >
        <Stack px={10}>
          <Box height={20}/>
            <Stack direction={'row'} spacing={3}>
                <Typography sx={font3} flexGrow={2}>Egg Donor</Typography>
                <Box flexGrow={8} flexBasis={8}>
                  <Autocomplete
                  placeholder="Search products"
                  openOnFocus
                  />
                </Box>
                <Button sx={{flexGrow:2}} 
                variant="contained" onClick={()=>{router.push('agc/eds/create')}}
                startIcon={<Add/>}>add ed</Button>
            </Stack>
        </Stack>
        <div className="container wrapper">
          <div>
            <RefinementList attribute="brand" />
          </div>
          <div>
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </div>
    </InstantSearchNext>;
}

function Hit({ hit }: any) {
    return (
      <article className="hit">
        <div className="hit-image">
          <img src={hit.image} alt={hit.name} />
        </div>
        <div>
          <h1>
            <Highlight hit={hit} attribute="name" />
          </h1>
          <div>
            By <strong>{`${JSON.stringify(hit)}`}</strong> in{" "}
            {/* <strong>{hit.categories[0]}</strong> */}
          </div>
        </div>
      </article>
    );
  }