'use client'
import { EDsHits } from "@/app/_shared/_ed/_eds_blocks/hits";
import { algo_client } from "@/utils/algolia";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export const AllEDs=()=>{
    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    insights={true}
    future={{preserveSharedStateOnUnmount: true,}}
    >
        <EDsHits/>
    </InstantSearchNext>;
}