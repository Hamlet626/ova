'use client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import {Chip, InputAdornment, Stack, Typography, alpha} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useConnector } from 'react-instantsearch';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { EDRec, RcpRec, algo_client } from '@/utils/algolia';
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
import { neutral96 } from '@/components/ThemeRegistry/theme_consts';
import { AddCircleOutline } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import usePromise from 'react-use-promise';
import { AgencyRef, UserRef, UsersAgcDataRef, app } from '@/utils/firebase/firebase_client';
import { FieldValue, Firestore, arrayRemove, arrayUnion, collectionGroup, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { BasicInfoDoc } from '@/utils/firebase/types';

export const EDRecommender=({edid}:{edid:string})=>{
    const myid='test'//useSession({required:true}).data?.user?.id!;
    
    const {data,setData}=useLocalPromise<BasicInfoDoc[]>(async()=>{
      const r=await getDocs(query(collectionGroup(getFirestore(app),'agc data'),
      where('agcid','==',myid),where('recommends','array-contains',edid)));
      
      return Promise.all(
        r.docs.map(v=>getDoc(UserRef(RoleNum.Rcp,v.ref.parent.parent?.id!))
        .then(v=>({uid:v.id,...v.data()}as any)))
        );
    },[edid,myid]);


    return <Stack>
      <GoogleMaps agcid={myid} role={RoleNum.Rcp} 
      renderOption={(v: Hit<RcpRec>)=> {
        return <Typography>{v.name}</Typography>
        } }
        onChange={async(ev,v,reason,detail)=>{
          console.log(v,reason,detail);
          if(v!=null&&reason==="selectOption"){
            console.log(data,v.objectID)
            const existed=data?.some((rcp)=>rcp.uid===v.objectID);
            await setDoc(UsersAgcDataRef(RoleNum.Rcp,v.objectID,myid),
            {recommends:existed?arrayRemove(edid):arrayUnion(edid)},
            {merge:true});
            setData((d)=>existed?d?.filter((rcp)=>rcp.uid!==v.objectID):[
              ///todo:confirm
              v as any,...d??[]]);
          }
        }}
        />
        <Box height={12}/>
        <Grid2 container>
          {(data??[]).map(v=><Chip label={v.name}/>)}
        </Grid2>
    </Stack>
}

const useLocalPromise=<T=any>(promise:Promise<T> | (() => Promise<T>),deps:any[]=[],defaultValue?:T,)=>{
  const [data,setData]=useState<T|undefined>(defaultValue);
  
  const [pm,error,status]=usePromise(async()=>{
    if(typeof promise === 'function'){
      await promise().then(v=>setData(v));
    }else await promise.then(v=>setData(v));
  },deps);

  return {data,setData,error,status};
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
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly T[]>([]);

  const fetch = useMemo(
    () => debounce(
        async( { input }, callback: (results?: readonly T[]) => void, ) => {
          console.log('fetch',input);
              const algoData=await algo_client.initIndex(roles[role].id).search(input,{
                numericFilters:`agencies.${agcid}.status>=0`,
                hitsPerPage:5});
              console.log('result',algoData.hits);
                return callback(algoData.hits as any[]);
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    // if (inputValue === '') {
    //   setOptions(value ? [value] : []);
    //   return undefined;
    // }

    fetch({ input: inputValue }, (results?: readonly T[]) => {
      console.log('active',active,inputValue,results);
      if (active) {
        setOptions(results??[]);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      options={options}
      filterOptions={(x) => x}
      forcePopupIcon={false}
      noOptionsText="No locations"
      onChange={(event: any, newValue: T | null,reason,description) => {
        if(onChange!=null)onChange(event,newValue,reason,description);
      }}
      getOptionLabel={(v:T)=>v.name}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => ( 
      <TextField
      {...params}
      placeholder="Add a location" fullWidth variant='standard'
      InputProps={{ ...params.InputProps, disableUnderline: true ,
      startAdornment:<InputAdornment position='start'><AddCircleOutline/></InputAdornment>}}
      sx={{borderRadius: '28px',
      backgroundColor: neutral96,
      p:0.5,
      '&:hover': {
        backgroundColor: alpha(neutral96, 0.75),
      },}}
      />)
    }
      isOptionEqualToValue={(o,v)=>o.objectID===v.objectID}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`${option.objectID}`} >
            {renderOption(option)}
          </li>
        );
      }}
    />
  );
}