'use client'
import { font3 } from "@/components/ThemeRegistry/theme_consts";
import { algo_client } from "@/utils/algolia";
import { Stack, Typography } from "@mui/material";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Autocomplete } from "./searcher";

export default async function EDs(){
    return <InstantSearchNext indexName="ed" searchClient={algo_client}>
        <Stack px={10}>
            <Stack direction={'row'} spacing={3}>
                <Typography sx={font3} flexBasis={2}>Egg Donor</Typography>
                <Autocomplete
                placeholder="Search products"
                detachedMediaQuery="none"
                openOnFocus
                />
            </Stack>
        </Stack>
    </InstantSearchNext>;
}