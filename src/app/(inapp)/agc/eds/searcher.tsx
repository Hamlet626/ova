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
import { Clear, Delete, Remove, SearchOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Input, InputBase, Stack, Typography, alpha, styled } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import '@algolia/autocomplete-theme-classic';
import { OVA_very_soft_grey } from '@/components/ThemeRegistry/theme_consts';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createTagsPlugin } from '@algolia/autocomplete-plugin-tags';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { usePagination, useSearchBox } from "react-instantsearch";
import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';
import { Highlight } from 'react-instantsearch';

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

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient:algo_client,
  indexName: 'instant_search_demo_query_suggestions',
});
const tagsPlugin = createTagsPlugin();

type AutocompleteItem = Hit<EDRec>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {
  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();
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
      };
    },
  });
  
  const autocomplete = React.useMemo(
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
        plugins:[
          // querySuggestionsPlugin,
          tagsPlugin,
          recentSearchesPlugin
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

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
  }, [getEnvironmentProps, autocompleteState.isOpen]);

  return (
    <div {...autocomplete.getRootProps({})} style={{position:'relative'}}>
      <Search ref={formRef}
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
                <Stack direction={'row'}>
                  {
                    //autocompleteState.status==='loading'&&
                    // <CircularProgress size={20}
                    // sx={(theme)=>({mr:1,
                    //   color:alpha(theme.palette.primary.main,0.2)})} />
                  }
                  {autocompleteState.query&&
                  <IconButton title="Clear" type="reset">
                    <Clear />
                    </IconButton>}
                </Stack>
              }
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

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {source.sourceId}
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        const itemUI=source.sourceId==='eds'?Eds({item}):
                        source.sourceId==='tagsPlugin'?Eds({item}):
                        source.sourceId==='recentSearchesPlugin'?RecentSearch({item,onRemove:()=>{
                          recentSearchesPlugin.data?.removeItem(item.id);
                        }}):null;

                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            {itemUI}
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

const RecentSearch=({item,onRemove}:{item:AutocompleteItem,onRemove:Function})=>{
  const labelHighlights=parseAlgoliaHitHighlight({hit:item,attribute:'label'});
  
  return (
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <Box className="aa-ItemContentBody" display='inline'>
                                  {labelHighlights.map(v=>(<Typography variant='body2' display='inline' fontWeight={v.isHighlighted?'bold':undefined}>
                                    {v.value}
                                    </Typography>))}
                                    {/* </Typography> */}
                                </Box>
                              </div>
                              <div className="aa-ItemActions">
                                <IconButton onClick={ev=>onRemove()}>
                                  <Delete/>
                                </IconButton>
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