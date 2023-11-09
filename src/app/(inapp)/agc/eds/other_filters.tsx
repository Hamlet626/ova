import { getField } from "@/utils/form/form_utils/algo";
import { AlgoTemplates, formTemplates } from "@/utils/form/template";
import { AlgoMapping } from "@/utils/form/types";
import { Box, Breadcrumbs, Chip } from "@mui/material";
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

export const OtherFilters=()=>{
    
    return <Breadcrumbs separator={<Box width={8}/>} maxItems={6}>
    {AlgoTemplates.flatMap((vl,i,l)=>{
        return vl.map((v)=>{
            if(v.fdid==null)return <Filter temp={v} filterType={AlgoAttr.num}/>;

            const field=getField(formTemplates[i].content.flatMap(sec=>sec.fields),...(typeof v.fdid==='string'?[v.fdid]:v.fdid!));
            
            return <Filter temp={v} filterType={
                field.type==='checkbox'||field.type==='multi-select'||field.type==='text'?AlgoAttr.facet:
                field.type==='number'?AlgoAttr.num:
                field.type==='date'?AlgoAttr.date:
                field.type==='yes/no'?AlgoAttr.bool:
                AlgoAttr.num
            }/>;
        })
        })}
    </Breadcrumbs>
}

enum AlgoAttr{
    num=0,
    facet=1,
    bool=2,
    date=3,
}

const Filter=({temp,filterType}:{temp:AlgoMapping,filterType:AlgoAttr})=>{
    const {
        items,
        refine,
        searchForItems,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
        canRefine
      } = useRefinementList({
          attribute: temp.uiLabel??temp.label!,
          operator:'or',
      });
    return <Chip clickable variant={canRefine?'outlined':'filled'}
    label={attribute}
    onClick={}/>;
}