import { outline, primary90 } from '@/components/ThemeRegistry/theme_consts';
import { getCliId_Client } from '@/utils/clinic_id/client';
import { EDStatus, EDStatusLabel } from '@/utils/status';
import { Button, ButtonGroup, MenuItem, Select, TextField, styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useConfigure, UseRefinementListProps,InstantSearch,
  RefinementList,useNumericMenu,
  UseNumericMenuProps,
  useInstantSearch, } from 'react-instantsearch';

const buttonSx=(selected:boolean)=>({color:'black',borderColor:outline,bgcolor:selected?primary90:undefined});

export function StateFilter() {
  const agcId = getCliId_Client();
  const { items, refine } = useNumericMenu({
    attribute: `agencies.${agcId}.status`,
    items: [
      {label:"All"},
      ...Object.entries(EDStatusLabel).map(v=>({label:v[1],start:Number.parseInt(v[0]),end:Number.parseInt(v[0])}))]
  });

  return (
    <ButtonGroup variant="outlined" sx={{flexGrow:6}}>
      ...{(items.map(v=>{
        return <Button sx={buttonSx(v.isRefined)}
        onClick={(ev)=>{
          ev.preventDefault();
          refine(v.value);
        }}
        >{v.label}</Button>;
      }))
      }
      </ButtonGroup>
  );
}