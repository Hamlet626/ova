import { EDStatusLabel } from '@/utils/status';
import { Button, ButtonGroup, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

export function StateFilter(props: UseRefinementListProps) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <ButtonGroup variant="outlined">
                  {[<Button></Button>,
                    ...(Object.entries(EDStatusLabel).map(v=><Button></Button>))]}
                </ButtonGroup>
  );
}