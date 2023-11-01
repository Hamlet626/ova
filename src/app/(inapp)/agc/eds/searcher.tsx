import { EDRec, algo_client } from '@/utils/algolia';
import { UserDoc } from '@/utils/firebase/database_consts';
import { app, cliAuth } from '@/utils/firebase/firebase_client';
import { RoleNum, roles } from '@/utils/roles';
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import { Clear, Delete, History, HistoryOutlined, NorthWest, Remove, SearchOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Input, InputBase, Stack, Typography, alpha, styled } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useMemo } from 'react';
import '@algolia/autocomplete-theme-classic';
import { OVA_very_soft_grey } from '@/components/ThemeRegistry/theme_consts';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createTagsPlugin } from '@algolia/autocomplete-plugin-tags';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { usePagination, useSearchBox } from "react-instantsearch";
import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import { Highlight, useInstantSearch } from 'react-instantsearch';
import {GetEnvironmentProps} from '@algolia/autocomplete-shared/dist/esm/core'
import { AutocompleteSource } from '@algolia/autocomplete-js';
import { ParsedAttribute } from '@algolia/autocomplete-preset-algolia/dist/esm/highlight/ParsedAttribute';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: '12ch',
      // '&:focus': {
      //   width: '20ch',
      // },
    },
  },
}));


const tagsPlugin = createTagsPlugin();

type AutocompleteItem = Hit<EDRec>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {
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
  // useEffect(() => {
  //   setQuery(autocompleteState.query);
  //   setPage(0);
  // }, [autocompleteState.query]);

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
        // templates:{
        //   item(params) {
        //     params.components.Highlight
        //   },
        // }
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

    // const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    //   searchClient:algo_client,
    //   indexName: 'ed_query_suggestions',
    //   // getSearchParams() {
    //   //   if (currentCategory.length === 0) {
    //   //     return recentSearchesPlugin.data.getAlgoliaSearchParams({
    //   //       hitsPerPage: 6,
    //   //     });
    //   //   }

    //   //   return recentSearchesPlugin.data.getAlgoliaSearchParams({
    //   //     hitsPerPage: 3,
    //   //     facetFilters: [
    //   //       `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:-${currentCategory}`,
    //   //     ],
    //   //   });
    //   // },
    //   // categoryAttribute: [
    //   //   INSTANT_SEARCH_INDEX_NAME,
    //   //   'facets',
    //   //   'exact_matches',
    //   //   INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0],
    //   // ],
    //   // transformSource({ source }) {
    //   //   return {
    //   //     ...source,
    //   //     sourceId: 'querySuggestionsPlugin',
    //   //     onSelect({ item }) {
    //   //       setSearchState((searchState) => ({
    //   //         ...searchState,
    //   //         query: item.query,
    //   //         hierarchicalMenu: {
    //   //           [INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]]:
    //   //             item.__autocomplete_qsCategory || '',
    //   //         },
    //   //       }));
    //   //     },
    //   //     getItems(params) {
    //   //       if (!params.state.query) {
    //   //         return [];
    //   //       }

    //   //       return source.getItems(params);
    //   //     },
    //   //     templates: {
    //   //       ...source.templates,
    //   //       header({ items }) {
    //   //         if (currentCategory.length === 0 || items.length === 0) {
    //   //           return <></>;
    //   //         }

    //   //         return (
    //   //           <>
    //   //             <span className="aa-SourceHeaderTitle">
    //   //               In other categories
    //   //             </span>
    //   //             <span className="aa-SourceHeaderLine" />
    //   //           </>
    //   //         );
    //   //       },
    //   //     },
    //   //   };
    //   // },
    // });

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
          // querySuggestionsPlugin,
          tagsPlugin,
          recentSearchesPlugin,
          ...plugins
        ],
        // insights: true,
        getSources() {
          return [
            {
              sourceId: 'eds',
              getItems:async({ query }) => {
                const algoData=await algo_client.initIndex(roles[RoleNum.ED].id).search(query,{hitsPerPage:5});
                return await Promise.all(algoData.hits.map(async v=>{
                  const fbData=await getDoc(doc(getFirestore(app),UserDoc(RoleNum.ED,v.objectID)));
                  //return {...v,...fbData.data};
                  return {...v,...fbData.data} as AutocompleteItem;
                }));
              },
              // getItemUrl({ item }) {
              //   return item.avatar??null;
              // },
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
                  const itemUI=source.sourceId==='eds'?Eds({item}):
                  source.sourceId==='tagsPlugin'?Eds({item}):
                  source.sourceId==='querySuggestionsPlugin'?QSuggest({item,setQuery:autocomplete.setQuery}):
                  source.sourceId==='recentSearchesPlugin'?RecentSearch({item,onRemove:()=>{
                    recentSearchesPlugin.data?.removeItem(item.id);
                    autocomplete.refresh();
                    //todo:test
                    // const r=(await recentSearchesPlugin.getSources()) as AutocompleteSource<AutocompleteItem>[];
                    // r[0].templates
                  }}):null;

                  return (
                    <li
                      key={item.objectID}
                      className="aa-Item"
                      {...autocomplete.getItemProps({ item, source })}
                    >
                      <div className="aa-ItemWrapper">
                        {itemUI}
                      </div>
                    </li>
                  );
                });
              
              return (
                <section key={`source-${index}`} className="aa-Source">
                  {source.sourceId}
                  {source.sourceId==='eds'?<Grid2>
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
  )
  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapperPrefix">
          <label className="aa-Label" {...autocomplete.getLabelProps({})}>
            <button className="aa-SubmitButton" type="submit" title="Submit">
              <Search />
            </button>
          </label>
        </div>
        <div className="aa-InputWrapper">
          <Input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
        <div className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <Clear />
          </button>
        </div>
      </form>

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

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                  <img
                                    src={item.avatar}
                                    alt={item.name}
                                    width="40"
                                    height="40"
                                  />
                                </div>
                                <div className="aa-ItemContentBody">
                                  {/* <div className="aa-ItemContentTitle">
                                    <Highlight hit={item} attribute="name" />
                                  </div> */}
                                  <div className="aa-ItemContentDescription">
                                    By <strong>{item.name}</strong> in{' '}
                                  </div>
                                </div>
                              </div>
                              <div className="aa-ItemActions">
                                <button
                                  className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                  type="button"
                                  title="Select"
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
  return (
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                  <img
                                    src={item.avatar}
                                    alt={item.name}
                                    width="40"
                                    height="40"
                                  />
                                </div>
                                <div className="aa-ItemContentBody">
                                  {/* <div className="aa-ItemContentTitle">
                                    <Highlight hit={item} attribute="name" />
                                  </div> */}
                                  <Typography className="aa-ItemContentDescription">
                                    By <strong>{JSON.stringify(item)}</strong> in{' '}
                                  </Typography>
                                </div>
                              </div>
                              <div className="aa-ItemActions">
                                <button
                                  className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                  type="button"
                                  title="Select"
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
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