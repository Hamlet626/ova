'use client'
import { font3 } from "@/components/ThemeRegistry/theme_consts";
import { algo_client } from "@/utils/algolia";
import { Stack, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
    Highlight,
    Hits,
    InstantSearch,
    Pagination,
    RefinementList,
    SearchBox,
  } from "react-instantsearch";
import { Autocomplete } from "../(inapp)/agc/eds/searcher";

export default async function EDs(){
    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    future={{preserveSharedStateOnUnmount: true,}}
    >
        <Stack px={10}>
            <Stack direction={'row'} spacing={3}>
                <Typography sx={font3} flexGrow={2}>Egg Donor</Typography>
                <Autocomplete
                placeholder="Search products"
                detachedMediaQuery="none"
                openOnFocus
                />
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