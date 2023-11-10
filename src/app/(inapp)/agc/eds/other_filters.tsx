import { dialogHeader, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { getField } from "@/utils/form/form_utils/algo";
import { AlgoTemplates, formTemplates } from "@/utils/form/template";
import { AlgoMapping } from "@/utils/form/types";
import { Clear, Search } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Checkbox, Chip, FormControlLabel, IconButton, Input, InputBase, Menu, Stack, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

export const OtherFilters=()=>{
    
    return <Breadcrumbs separator={<Box width={8}/>} maxItems={6}>
    {AlgoTemplates.flatMap((vl,i,l)=>{
        return vl.filter(v=>v.filter??true).map((v)=>{
            if(v.fdid==null)return <NumFilter temp={v}/>;

            try{
            const field=getField(formTemplates[i].content.flatMap(sec=>sec.fields),...(typeof v.fdid==='string'?[v.fdid]:v.fdid!));
            
            return field.type==='checkbox'||field.type==='multi-select'||field.type==='text'?<FacetFilter temp={v} searchable/>:
                field.type==='number'?<NumFilter temp={v}/>:
                field.type==='date'?<DateFilter temp={v}/>:
                field.type==='yes/no'?<BoolFilter temp={v}/>:
                <NumFilter temp={v}/>;}catch(e){return <text>{`${e}`}</text>;}
        })
        })}
        <FacetFilter temp={{label:'tags'}} searchable/>
    </Breadcrumbs>
}

enum AlgoAttr{
    num=0,
    facet=1,
    bool=2,
    date=3,
}

const FacetSearcher=styled(InputBase)(({theme})=>({
    backgroundColor:neutral96,
    borderRadius:'28px',
    height:'42px',
    paddingLeft:'8px',
    color:theme.palette.primary.main
    // '&:hover':{
    //     backgroundColor:neutral96,
    // }
}));

const FacetFilter=({temp,searchable}:{temp:AlgoMapping,searchable?:boolean})=>{
    if(temp.uiLabel??temp.label==null)return <text>{JSON.stringify(temp)}</text>
    const attribute=temp.uiLabel??temp.label!;
    const {
        items,
        refine,
        searchForItems,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
        canRefine
      } = useRefinementList({
          attribute: attribute,
          operator:'or',
      });
    //   const [checked, setChecked] = useState(new Set(items.filter(v=>v.isRefined).map(v=>v.value)));
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [searchText,setText]=useState('');

    return <div>
        <Chip clickable variant={canRefine?'outlined':'filled'}
        label={attribute}
        onClick={(event)=>{
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        }}/>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}}>
            <Stack px={2} py={3}>
            <Typography sx={dialogHeader}>{attribute}</Typography>
            <Box height={16}/>
            { searchable && 
            <FacetSearcher startAdornment={<Search/>} 
            value={searchText} onChange={(event)=>{
                setText(event.target.value);
                searchForItems(event.target.value);}}
                endAdornment={searchText.length>0?<IconButton disableRipple onClick={()=>{
                    setText('');
                searchForItems('');
                }}><Clear/></IconButton>:undefined}/>}
                {items.map(item=>(<FormControlLabel
                label={item.label}
                control={
                    <Checkbox
                    checked={item.isRefined}
                    onChange={(v)=>{
                        refine(item.value);
                        // if(v)setChecked(checked.add(item.value));
                        // else{ 
                        //     checked.delete(item.value);
                        //     setChecked(checked);}
                    }}
                    />
                    }/>))}
                    {/* <Stack direction={'row'}>
                        {checked.keys.length>0 && 
                        <Button variant="outlined" onClick={()=>{
                            checked.clear();
                            setChecked(checked);}}>Clear</Button>}
                        <Box flexGrow={1}/>
                        {checked.keys.length>0 && 
                        <Button variant="contained" onClick={()=>{
                            refine()
                            checked.clear();
                            setChecked(checked);}}>Apply</Button>}
                    </Stack> */}
                    </Stack>
        </Menu>
    </div>;
}

const NumFilter=({temp}:{temp:AlgoMapping})=>{
    const attribute=temp.uiLabel??temp.label!;

    return <Chip clickable 
    // variant={canRefine?'outlined':'filled'}
    //label={attribute}
    // onClick={}
    />;
}

const DateFilter=({temp}:{temp:AlgoMapping})=>{
    const attribute=temp.uiLabel??temp.label!;

    return <Chip clickable 
    // variant={canRefine?'outlined':'filled'}
    //label={attribute}
    // onClick={}
    />;
}

const BoolFilter=({temp}:{temp:AlgoMapping})=>{

    return <Chip clickable 
    // variant={canRefine?'outlined':'filled'}
    // label={attribute}
    // onClick={}
    />;
}