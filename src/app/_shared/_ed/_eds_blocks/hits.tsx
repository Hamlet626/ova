'use client'
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRef, useEffect } from "react";
import { EdAlgoTile } from "../_ed_tiles/algo_tile";
import { useInfiniteHits } from 'react-instantsearch';
import { edTileMaxWidth, edTileMinWidth } from "./consts";
import { Box } from "@mui/material";

export const EDsHits=()=>{
    // const { hits, results, sendEvent } = useHits();
    const { hits, isLastPage, showMore, bindEvent, sendEvent } = useInfiniteHits({showPrevious:true});
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            if(showMore!=null)
              showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  
    return <Grid2 container rowSpacing={'20px'} columnSpacing={3}>
        {hits.map((v,i)=>
        <Grid2 key={i} xs maxWidth={edTileMaxWidth} minWidth={edTileMinWidth}>
            <EdAlgoTile hit={v} sendEvent={sendEvent}/>
            </Grid2>)}
            {Array.from({length:9}).map((v,i)=>
            <Grid2 key={i} xs maxWidth={edTileMaxWidth} minWidth={edTileMinWidth}>
              <Box/>
            </Grid2>)}

            <Grid2 key={'last'} ref={sentinelRef} 
            xs maxWidth={edTileMaxWidth} minWidth={edTileMinWidth}>
              <Box/>
            </Grid2>
    </Grid2>;
}