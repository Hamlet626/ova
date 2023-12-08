'use client'
import { algo_client } from "@/utils/algolia";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { EDsHits } from "../../agc/eds/ed_tile";

export const AllEDs=()=>{
    return <InstantSearchNext indexName="ed" searchClient={algo_client}
    insights={true}
    future={{preserveSharedStateOnUnmount: true,}}
    >
        <EDsHits/>
    </InstantSearchNext>;
}