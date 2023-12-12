import { MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import {
  useSortBy,
  UseSortByProps,
} from 'react-instantsearch';

export function SortBy(props: UseSortByProps) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <TextField select label='Sort By'
      onChange={(event) => refine(event.target.value)}
      value={currentRefinement}
      sx={{minWidth:200, justifySelf:'end'}}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}