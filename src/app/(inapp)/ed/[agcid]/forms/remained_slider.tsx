'use client'

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Scrollbar } from 'swiper/modules';
import { Button, Card, CardActionArea, CardContent, Fab, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import 'swiper/css';
import { useEffect, useRef, useState } from "react";

export const RemainedSlider=({remainedData})=>{
    const swiperRef=useRef<HTMLDivElement | null>(null);
    const [showNext,setShowNext]=useState(false);
    const onscroll=()=>{
        if(swiperRef.current){
            setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
        }
    };

    return (
        <div style={{position:'relative',width:'100%'}}>
        <div ref={swiperRef} style={{
            height:'72px',
            width: '100%',
            display: 'flex',
            overflow: 'auto',
            scrollBehavior: 'smooth',
            transition: 'scroll 0.3s ease-in-out'}} onScroll={onscroll}>
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
        {showNext && (
        <Button
          variant="contained"
          color="primary"
          style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            filter: 'blur(5px)', // Apply blur effect
          }}
        >
          Next
        </Button>
      )}
        </div>
    );
}