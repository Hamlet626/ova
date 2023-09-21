'use client'

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Scrollbar } from 'swiper/modules';
import { Button, Card, CardActionArea, CardContent, Fab, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import 'swiper/css';
import { useEffect, useRef, useState } from "react";

export const RemainedSlider=({remainedData})=>{
    const swiperRef=useRef<HTMLDivElement|null>(null);
    const [showNext,setShowNext]=useState(false);
    console.log(swiperRef.current)
    const onscroll=()=>{
        if(swiperRef.current){
          console.log(swiperRef.current.scrollLeft,swiperRef.current.offsetWidth,swiperRef.current.scrollWidth);
            setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
        }
    };

    useEffect(()=>{
      console.log("here",swiperRef.current)
      if(swiperRef.current){
        setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
      }
    },[remainedData]);

    return (
        <div style={{position:'relative'}}>
        <div ref={swiperRef} //direction={'row'} spacing={'16px'} 
        style={{width:'100%',height:'82px',
            overflow: 'auto',
            overflowX: 'scroll',
            overflowY:'hidden',
            scrollBehavior: 'smooth',
            transition: 'scroll 0.3s ease-in-out'
            }} onScroll={onscroll}>
              <div //direction={'row'} spacing={'16px'} 
              //width={'20000px'}
              style={{width:'2000px'}}
              >
            {([...remainedData,...remainedData,...remainedData].map((v)=>(
                <Card sx={{display: 'inline-block',flexShrink: 0}}>
                <CardActionArea>
                    <CardContent sx={{}}>
                        <Typography variant="subtitle2" color={'secondary'}>{v.title}</Typography>
                        <Typography variant="subtitle2" noWrap>{v.subs.remained.join(', ')}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)))}
            </div>
        </div>
        {showNext && <>
        <div style={{position: 'absolute',
        top: 0,
        right: 0,
        width: '40px',
        height: '100%',
        background: 'linear-gradient(to left, white, transparent)',}}></div>
        <Button
          variant="contained"
          color="primary"
          style={{
            position: 'absolute',
            right: -20,
            bottom: 20,
          }}
        >
          Next
        </Button></>}
        </div>
    );
}