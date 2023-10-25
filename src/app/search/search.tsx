'use client';
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
      <SearchBox />
      {/* other widgets */}
      <Hits/>
   </InstantSearchNext>
  );
}
