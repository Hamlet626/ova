import { dialogHeader, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { getField } from "@/utils/form/form_utils/algo";
import { AlgoTemplates, formTemplates } from "@/utils/form/template";
import { AlgoMapping } from "@/utils/form/types";
import { Check, Clear, Search } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Checkbox, Chip, FormControlLabel, IconButton, Input, InputBase, Menu, Stack, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useRefinementList, UseRefinementListProps, useConfigure, useClearRefinements, useRange, useInstantSearch } from 'react-instantsearch';
import { RangeInput } from "./test";

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
        // canRefine
      } = useRefinementList({
          attribute: attribute,
          operator:'or',
          sortBy:['isRefined','count:desc']
      });
      const { canRefine:canClear, refine:clearRefine } = useClearRefinements({includedAttributes:[attribute]});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [searchText,setText]=useState('');


    return <div>
        <Chip clickable variant={canClear?'filled':'outlined'}
        color={'secondary'}
        // label={attribute}
        onClick={(event)=>{
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        }}
        icon={canClear?<Check/>:undefined}
        onDelete={canClear?clearRefine:undefined}
        />
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
    if(temp.uiLabel??temp.label==null)return <text>{JSON.stringify(temp)}</text>
    const attribute=temp.uiLabel??temp.label!;

    const { refine,start,range } = useRange({ attribute: attribute });
      
      const { canRefine:canClear, refine:clearRefine } = useClearRefinements({includedAttributes:[attribute]});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [minText,setMinText]=useState(start[0]);
      const [maxText,setMaxText]=useState(start[1]);

      const lowerBond=range.min??-Infinity;
      const upperBond=range.max??Infinity;
      
      const processMin=//minText==null||Number.isNaN(minText)||
      !Number.isFinite(minText)
      ||minText!<=lowerBond?undefined:minText;
      
      const processMax=//maxText==null||Number.isNaN(maxText)||
      !Number.isFinite(maxText)
      ||maxText!>=upperBond?undefined:maxText;
      
      


    return <div>
        <Chip clickable variant={canClear?'filled':'outlined'}
        color={'secondary'}
        label={attribute}
        onClick={(event)=>{
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        }}
        icon={canClear?<Check/>:undefined}
        onDelete={canClear?clearRefine:undefined}
        />
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}}>
            <Stack px={2} py={3}>
            <Typography sx={dialogHeader}>{attribute}</Typography>
            <Box height={16}/>

            <Stack direction={'row'}>
                <TextField type='number' value={minText}
                onChange={(event)=>setMinText(Number.parseFloat(event.target.value))}
                placeholder={`> ${range.min}`}
                helperText={Number.isFinite(minText)&&minText!==processMin?
                    `Lowest value among dataset is ${range.min}`:undefined}
                />
                <Box width={8}/>
                <Typography variant="body1" mt={2}>To</Typography>
                <Box width={8}/>
                <TextField type='number' value={maxText}
                onChange={(event)=>setMaxText(Number.parseFloat(event.target.value))}
                placeholder={`< ${range.max}`}
                helperText={Number.isFinite(maxText)&&maxText!==processMax?
                `Highest value among dataset is ${range.max}`:undefined}/>
            </Stack>
            { ( (processMin??-Infinity)!=start[0]||(processMax??Infinity)!=start[1]) && 
            <>
            <Box height={16}/>
            <Button variant="contained" sx={{alignSelf:'end'}}
            onClick={(event)=>{
                event.stopPropagation();
                
                refine([processMin,processMax]);
            }}>
                Apply
            </Button>
            </>
            }
            </Stack>
        </Menu>
    </div>;
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
    const attribute=temp.uiLabel??temp.label!;

    const { refine,start,range } = useConfigure({ });
      
      const { canRefine:canClear, refine:clearRefine } = useClearRefinements({includedAttributes:[attribute]});


    return <Chip clickable variant={canClear?'filled':'outlined'}
    color={'secondary'}
    label={attribute}
    onClick={(event)=>{
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }}
    icon={canClear?<Check/>:undefined}
    onDelete={canClear?clearRefine:undefined}
    />;
}