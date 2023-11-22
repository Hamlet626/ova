'use client'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, InputAdornment, alpha} from '@mui/material';
import { debounce } from '@mui/material/utils';
import { roles, RoleNum } from '@/utils/roles';

import { BaseItem } from '@algolia/autocomplete-shared/dist/esm/core'
import { HTMLAttributes, ReactNode, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { AddCircleOutline, Check } from '@mui/icons-material';
import { primary90, neutral96 } from '@/components/ThemeRegistry/theme_consts';
import { algo_client } from '@/utils/algolia';


export default function UserSearcher<T extends BaseItem&{objectID:string}>({agcid,role,loading=false,onChange,renderOption,ACprops}:
    {agcid:string,role:RoleNum,loading?:boolean,
        onChange?:(event: SyntheticEvent, value: T | null, reason: string, details?: any) => void,
        renderOption:(v:T,props: HTMLAttributes<HTMLLIElement>)=>ReactNode
        ACprops?:any
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
    <Autocomplete value={null}
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
      startAdornment:<InputAdornment position='start'>
        {loading? <CircularProgress size={32}/> : 
        <AddCircleOutline color='primary' sx={{bgcolor:primary90,p:'6px', width:32, height:32, borderRadius:'50%'}}/>}
        </InputAdornment>}}
      sx={{borderRadius: '28px',
      backgroundColor: neutral96,
      p:0.5,
      '&:hover': {
        backgroundColor: alpha(neutral96, 0.75),
      },}}
      />)
    }
      isOptionEqualToValue={(o:T,v:T)=>o.objectID===v.objectID}
      renderOption={(props, option:T) => {
        return renderOption(option,props);
      }}
      disabled={loading}
      {...ACprops}
    />
  );
}