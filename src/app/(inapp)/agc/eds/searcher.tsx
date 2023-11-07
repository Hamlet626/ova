import { EDRec, algo_client } from '@/utils/algolia';
import { UserDoc, UsersAgcDataDoc } from '@/utils/firebase/database_consts';
import { app } from '@/utils/firebase/firebase_client';
import { RoleNum, roles } from '@/utils/roles';
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import { Clear, Delete, History, HistoryOutlined, NorthWest, Remove, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, IconButton, Input, InputBase, Stack, Typography, alpha, styled } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useMemo } from 'react';
import '@algolia/autocomplete-theme-classic';
import { OVA_very_soft_grey, font7 } from '@/components/ThemeRegistry/theme_consts';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createTagsPlugin } from '@algolia/autocomplete-plugin-tags';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { usePagination, useSearchBox } from "react-instantsearch";
import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import { Highlight, useInstantSearch } from 'react-instantsearch';
import {GetEnvironmentProps} from '@algolia/autocomplete-shared/dist/esm/core'
import { AutocompleteSource, AutocompletePlugin } from '@algolia/autocomplete-js';
import { ParsedAttribute } from '@algolia/autocomplete-preset-algolia/dist/esm/highlight/ParsedAttribute';
import usePromise from 'react-use-promise';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getCliId_Client } from '@/utils/clinic_id/client';

import aa from "search-insights";
// import { ClearIcon } from './ClearIcon';
// import { Highlight } from './Highlight';
// import { SearchIcon } from './SearchIcon';

const Search = styled('form')(({ theme }) => ({
  display:'flex',
  borderRadius: '28px',
  backgroundColor: OVA_very_soft_grey,
  '&:hover': {
    backgroundColor: alpha(OVA_very_soft_grey, 0.75),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const tagsPlugin = createTagsPlugin();

type AutocompleteItem = Hit<EDRec>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {

  // aa('init', { appId:'4WJ9FHOG84', apiKey:'92bb7bfcde71a02e96721c077a0b491c', 
  //               useCookie:true, partial: true,anonymousUserToken:true});
  const enableInsight=false;
  const { indexUiState, setIndexUiState } = useInstantSearch();

  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',//new URLSearchParams(window.location.search).get('search')??'',
    activeItemId: null,
    status: 'idle',
  });
  

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'RECENT_ED_SEARCH',
    limit: 5,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          // Assuming the refine function updates the search page state.
          console.log(item);
          autocomplete.setQuery(item.label);
        },
      };
    },
  });


  const plugins = useMemo(() => {

    const params=refineListToQrParam(indexUiState.refinementList as any);
    const querySuggestionsInCategoryPlugin = createQuerySuggestionsPlugin({
      searchClient:algo_client,
      indexName: 'ed_query_suggestions',
      ...(//recentSearchesPlugin.data==null?{}:
        {getSearchParams(){

        return recentSearchesPlugin.data!.getAlgoliaSearchParams({
          hitsPerPage: 3,
          ...(enableInsight?{clickAnalytics:true}:{})
          //facetFilters: params,
            // `${INSTANT_SEARCH_INDEX_NAME}.facets.analytics.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:${currentCategory}`,
        });
      }}),
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setIndexUiState((state)=>({...state,
              query:item.query,page:0}));
          },
        };
      },
    });

    return [
      querySuggestionsInCategoryPlugin,
      // querySuggestionsPlugin,
    ];
  }, [indexUiState.refinementList]);
  
  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        initialState:autocompleteState,
        plugins:[
          recentSearchesPlugin,
          ...plugins
        ],
        insights: enableInsight,
        getSources() {
          return [
            {
              sourceId: 'eds',
              getItems:async({ query }) => {
                return getAlgoliaResults({
                  searchClient:algo_client,
                  queries: [
                    {
                      indexName: roles[RoleNum.ED].id,
                      query,
                      params: {
                        hitsPerPage:5,
                        clickAnalytics: enableInsight,
                      },
                    },
                  ],
                });
                // const algoData=await algo_client.initIndex(roles[RoleNum.ED].id).search(query,{hitsPerPage:5});
                // return algoData.hits as any[];
                // return await Promise.all(algoData.hits.map(async v=>{
                //   const fbData=await getDoc(doc(getFirestore(app),UserDoc(RoleNum.ED,v.objectID)));
                //   //return {...v,...fbData.data};
                //   return {...v,...fbData.data} as AutocompleteItem;
                // }));
              },
            },
          ];
        }, 
        ...props,
      }),
    [props]
  );

  const { getEnvironmentProps } = autocomplete;
  const {inputRef,formRef,panelRef}= useRefHook(autocompleteState.isOpen,getEnvironmentProps);

  return (
    <div className="aa-Autocomplete" 
    {...autocomplete.getRootProps({})} style={{position:'relative'}}>
      <Search ref={formRef} //className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
            <SearchIconWrapper>
              <SearchOutlined color='primary'/>
            </SearchIconWrapper>
            <InputBase fullWidth
            sx={(theme)=>({
              '& .MuiInputBase-input': {
                padding: theme.spacing(1, 0, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
              }
            })}
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
              placeholder="Search…"
              type='text'
              endAdornment={
                autocompleteState.query?
                  <IconButton title="Clear" type="reset">
                    <Clear />
                    </IconButton>:undefined}
            />
            <Button variant='contained' type="submit"
            sx={{borderTopLeftRadius:0,borderBottomLeftRadius:0,
              m:'2px'
            }}>
            <SearchOutlined/>
            </Button>
            </Search>
            
            {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;
              if(items.length===0)return null;

              const children = items.map((item) => {
                if(source.sourceId==='eds')return  <Grid2
                key={item.objectID}
                className="aa-Item"
                {...autocomplete.getItemProps({ item, source })}
              >
                <div className="aa-ItemWrapper">
                <Eds item={item}/>
                </div>
              </Grid2>;

                  return (
                    <li
                      key={item.objectID}
                      className="aa-Item"
                      {...autocomplete.getItemProps({ item, source })}
                    >
                      <div className="aa-ItemWrapper">
                        {
                        source.sourceId==='tagsPlugin'?Eds({item}):
                  source.sourceId==='querySuggestionsPlugin'?<QSuggest item={item} setQuery={autocomplete.setQuery}/>:
                  source.sourceId==='recentSearchesPlugin'?<RecentSearch item={item} onRemove={()=>{
                    recentSearchesPlugin.data?.removeItem(item.id);
                    autocomplete.refresh();
                  }}/>:null
                  }
                      </div>
                    </li>
                  );
                });
              
              return (
                <section key={`source-${index}`} className="aa-Source">
                  {/* {source.sourceId} */}
                  {source.sourceId==='eds'?<Grid2 container spacing={2}>
                    {children}
                  </Grid2>:
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                      {children}
                    </ul>
                  }
                </section>
              );
            })}
          </div>
        </div>
      )}
      </div>
  );
}

const refineListToQrParam=(refineList:{
  [attribute: string]: string[];
}):any=>{

}

const useRefHook=(isOpen:boolean,getEnvironmentProps:GetEnvironmentProps)=>{
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, isOpen]);

  return {inputRef,formRef,panelRef}
}

const RecentSearch=({item,onRemove}:{item:AutocompleteItem,onRemove:Function})=>{
  
  return (<>
  <div className="aa-ItemContent">
    <div className="aa-ItemIcon aa-ItemIcon--noBorder">
      <History/>
    </div>
    <AlgoHighlightText item={item} attribute='label'/>
  </div>
  <div className="aa-ItemActions">
    <IconButton className="aa-ItemActionButton"
    disableRipple title="Remove this search"
    onClick={event=>{
      event.preventDefault();
      event.stopPropagation();
      onRemove()}}>
      <Delete/>
    </IconButton>
  </div>
  </>
  );
}

const Eds=({item}:{item:AutocompleteItem})=>{
  const user=useSession({required:true}).data?.user;
  const agcId=getCliId_Client(user?.role,user?.id)!;
  const [basicInfo,infoError,infoState]=usePromise(
    ()=>getDoc(doc(getFirestore(app),UserDoc(RoleNum.ED,item.objectID))),
    [item.objectID]);
  const [agcData,agcError,agcState]=usePromise(
    ()=> getDoc(doc(getFirestore(app),UsersAgcDataDoc(RoleNum.ED,item.objectID,agcId))),
    [item.objectID,agcId]);

  return (
  <Stack className="aa-ItemContent" spacing={1}>
    <div style={{ position: 'relative', width: '160px', height: '90px', borderRadius:'12px'}}>
      {infoState==='pending'?<center><CircularProgress size={60}/></center>:
      <Image src={basicInfo?.data()?.avatar} alt={item.name} sizes='160px' fill
        style={{ objectFit: 'cover', }}/>
        }
    </div>
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography sx={font7}>
        {item.name}
      </Typography>
      <Typography variant='subtitle3' color='secondary'>
        {agcData?.data()?.['price']??''}
      </Typography>
    </Stack>
    <Stack direction={'row'} justifyContent={'space-between'}>
      {item.tags?.slice(0,2).map(v=>(<Chip key={v} label={v} color='secondary'/>))}
      {item.tags!=null&& item.tags?.length>2 && <Chip label='...' color='secondary'/>}
    </Stack>
    </Stack>
  );
}

const QSuggest=({item,setQuery}:{item:AutocompleteItem,setQuery:Function})=>{
  if (item.__autocomplete_qsCategory)
    return (
        <div className="aa-ItemContent aa-ItemContent--indented">
          <div className="aa-ItemContentSubtitle aa-ItemContentSubtitle--standalone">
            <span className="aa-ItemContentSubtitleIcon" />
            <span>
              in{' '}
              <span className="aa-ItemContentSubtitleCategory">
                {item.__autocomplete_qsCategory}
              </span>
            </span>
          </div>
        </div>
    );
  

  return (
    <>
      <div className="aa-ItemContent aa-ItemContent--indented">
        <AlgoHighlightText item={item} attribute='query'/>
      </div>
      <div className="aa-ItemActions">
        <IconButton className="aa-ItemActionButton"
        disableRipple 
          title={`Fill query with "${item.query}"`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setQuery(item.query);
          }}
        >
          <NorthWest/>
        </IconButton>
          </div>
        </>
      );
}

const AlgoHighlightText=({className,variant='body2',item,attribute}:
  {className?:string,variant?:string,item:AutocompleteItem,attribute:string})=>{
  const labelHighlights=parseAlgoliaHitHighlight({hit:item,attribute});
  return <Box className="aa-ItemContentBody" display='inline'>
    {labelHighlights.map(v=>(<Typography variant={variant as any} display='inline' fontWeight={v.isHighlighted?'bold':undefined}>
                                    {v.value}
                                    </Typography>))}
                                </Box>
  };