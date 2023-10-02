'use client'

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Scrollbar } from 'swiper/modules';
import { Button, Card, CardActionArea, CardContent, Fab, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward, NavigateBefore, NavigateNext } from "@mui/icons-material";
import 'swiper/css';
import { useEffect, useRef, useState } from "react";
import { OVA_very_soft_grey } from "@/components/ThemeRegistry/theme_consts";

export const RemainedSlider=({remainedData})=>{
    const swiperRef=useRef<HTMLDivElement|null>(null);
    const [showNext,setShowNext]=useState(false);
    const [showPre,setShowPre]=useState(false);
    console.log(swiperRef.current)
    const onscroll=()=>{
        if(swiperRef.current){
          console.log(swiperRef.current.scrollLeft,swiperRef.current.offsetWidth,swiperRef.current.scrollWidth);
            setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
            setShowPre(swiperRef.current.scrollLeft>0);
        }
    };

    useEffect(()=>{
      console.log("here",swiperRef.current)
      if(swiperRef.current){
        setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
        setShowPre(swiperRef.current.scrollLeft>0);
      }
    },[remainedData]);

    const onScroll=(forward:boolean)=>{
      swiperRef.current?.scrollTo({
        left: swiperRef.current.scrollLeft + (forward?swiperRef.current.clientWidth:-swiperRef.current.clientWidth),
        behavior: 'smooth', // Optionally, add smooth scrolling behavior
      });
    }

    return (
        <div style={{position:'relative', height:'72px',}}>
        <div ref={swiperRef} //direction={'row'} spacing={'16px'} 
        style={{width:'100%',//height:'72px',
            overflow: 'auto',
            overflowX: 'scroll',
            overflowY:'hidden',
            scrollBehavior: 'smooth',
            transition: 'scroll 0.3s ease-in-out'
            }} onScroll={onscroll}>
              <Stack direction={'row'} spacing={'16px'}>
            {([...remainedData,...remainedData,...remainedData].map((v,i)=>(
              // <Paper sx={{display: 'inline-block',flexShrink: 0}}>
                <Card key={i} elevation={0} sx={{display: 'inline-block',flexShrink: 0, bgcolor:OVA_very_soft_grey}}> 
                <CardActionArea>
                    <CardContent>
                        <Typography variant="subtitle2" color={'secondary'}>{v.title}</Typography>
                        <Typography variant="subtitle2" noWrap>{v.subs.remained.join(', ')}</Typography>
                    </CardContent>
                </CardActionArea>
             </Card> 
            // </Paper>
            )))}
            </Stack>
        </div>
        {showPre && <>
        <div style={{position: 'absolute',
        top: 0,
        left: 0,
        width: '40px',
        height: '100%',
        background: 'linear-gradient(to right, white, transparent)',}}></div>
        <Fab size='small'
          onClick={()=>onScroll(false)}
          sx={{...CFabStyle, left: -20}}
        >
          <NavigateBefore/>
        </Fab></>}
        {showNext && <>
        <div style={{position: 'absolute',
        top: 0,
        right: 0,
        width: '40px',
        height: '100%',
        background: 'linear-gradient(to left, white, transparent)',}}></div>
        <Fab size='small' onClick={()=>onScroll(true)}
          sx={{...CFabStyle, right: -20,}}
        >
          <NavigateNext/>
        </Fab></>}
        </div>
    );
}


const CFabStyle={
  '&.MuiFab-sizeSmall': {height:'36px',width:'36px',backgroundColor:'white',color:'primary.main'},
  position: 'absolute',
  bottom: '50%',
  transform: 'translate(0, 50%)'
};