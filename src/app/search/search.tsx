'use client';
import { Box } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';
import {
  SearchBox,
  Hits,
} from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

const searchClient = algoliasearch('4WJ9FHOG84', '92bb7bfcde71a02e96721c077a0b491c');

export function Search() {
  return (
   <InstantSearchNext indexName="ed" searchClient={searchClient}>
   <Hits/>
      <Box display={'flex'} flexDirection={'row'}>
        <SearchBox />
      <Hits/>
        </Box>
      {/* other widgets */}
      <Hits/>
   </InstantSearchNext>
  );
}
