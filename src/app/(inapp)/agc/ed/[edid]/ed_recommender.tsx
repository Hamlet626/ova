'use client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { EDRec, algo_client } from '@/utils/algolia';
import { roles, RoleNum } from '@/utils/roles';
import { getAlgoliaResults } from '@algolia/autocomplete-js';

import { Hit } from '@algolia/client-search';
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';

import {BaseItem} from '@algolia/autocomplete-shared/dist/esm/core'
import { BaseSyntheticEvent, ReactNode, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

export const EDRecommender=({edid}:{edid:string})=>{
    const myid=useSession({required:true}).data?.user?.id;
    return <UserSearcher agcid={''} role={RoleNum.ED} 
    renderOption={(v: Hit<EDRec>)=> {
        return <Typography>{v.name}</Typography>
    } }/>
}
export function UserSearcher<T extends BaseItem>({agcid,role,onChange,renderOption}:
    {agcid:string,role:RoleNum,
        onChange?:(event: SyntheticEvent, value: T | null, reason: string, details?: any) => void,
        renderOption:(v:T)=>ReactNode
    }){

    const [value, setValue] = useState<T | null>(null);

    const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<T>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query:'',//new URLSearchParams(window.location.search).get('search')??'',
    activeItemId: null,
    status: 'idle',
  });

    const autocomplete = useMemo(
        () =>
          createAutocomplete<
            T,
            BaseSyntheticEvent,
            MouseEvent,
            KeyboardEvent
          >({
            onStateChange({ state }) {
              setAutocompleteState(state);
            },
            initialState:autocompleteState,
            placeholder:"Search products",
            openOnFocus:true,
            getSources() {
              return [
                {
                  sourceId: roles[role].id,
                  getItems:async({ query }) => {
                    return getAlgoliaResults({
                      searchClient:algo_client,
                      queries: [
                        {
                          indexName: roles[role].id,
                          query,
                          params: {
                            hitsPerPage:5,
                          },
                        },
                      ],
                    });
                  },
                },
              ];
            }, 
          }),
        [agcid]
      );
    
      console.log(autocompleteState)
      return (
        <Autocomplete sx={{ width: 300 }}
        open={autocompleteState.isOpen}
        //   getOptionLabel={(option) =>
        //     typeof option === 'string' ? option : option.description
        //   }
          filterOptions={(x) => x}
          options={autocompleteState.collections?.[0]?.items}
        //   autoComplete
        //   filterSelectedOptions
          value={value}
          noOptionsText="No Results"
          onChange={onChange}
          onInputChange={(event, value) => {
            autocomplete.setQuery(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Add a location" fullWidth />
          )}
          renderOption={(props, option) => {
    
            return (
              <li {...props}>
                {renderOption(option)}
              </li>
            );
          }}
        />
      );
}



export default function GoogleMaps<T extends BaseItem>({agcid,role,onChange,renderOption}:
    {agcid:string,role:RoleNum,
        onChange?:(event: SyntheticEvent, value: T | null, reason: string, details?: any) => void,
        renderOption:(v:T)=>ReactNode
    }){
  const [value, setValue] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly T[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        async(
          { input },
          callback: (results?: readonly T[]) => void,
        ) => {
            getAlgoliaResults({
                searchClient:algo_client,
                queries: [
                  {
                    indexName: roles[role].id,
                    query: input,
                    params: {
                      hitsPerPage:5,
                    },
                  },
                ],
              });
              const algoData=await algo_client.initIndex(roles[role].id).search(input,{hitsPerPage:5});
                return callback(algoData.hits as any[]);
                return await Promise.all(algoData.hits.map(async v=>{
                  const fbData=await getDoc(doc(getFirestore(app),UserDoc(RoleNum.ED,v.objectID)));
                  //return {...v,...fbData.data};
                  return {...v,...fbData.data} as AutocompleteItem;
                }));
        //   (autocompleteService.current as any).getPlacePredictions(
        //     request,
        //     callback,
        //   );
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly T[]) => {
      if (active) {
        let newOptions: readonly T[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
    //   filterOptions={(x) => x}
      options={options}
    //   autoComplete
    //   filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: T | null,reason,description) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if(onChange!=null)onChange(event,newValue,reason,description);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {

        return (
          <li {...props}>
            {renderOption(option)}
          </li>
        );
      }}
    />
  );
}