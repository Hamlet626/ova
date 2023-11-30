'use client'
import { Button, Card, CardActionArea, CardContent, Fab, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward, NavigateBefore, NavigateNext } from "@mui/icons-material";
// import 'swiper/css';
import { ReactNode, useEffect, useRef, useState } from "react";
import { OVA_very_soft_grey } from "@/components/ThemeRegistry/theme_consts";
import { redirect, useRouter } from "next/navigation";

export const RemainedSlider=({children,spacing=2}:{children:ReactNode,spacing?:number})=>{
    const swiperRef=useRef<HTMLDivElement|null>(null);
    const [showNext,setShowNext]=useState(false);
    const [showPre,setShowPre]=useState(false);
    const onscroll=()=>{
        if(swiperRef.current){
          setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
          setShowPre(swiperRef.current.scrollLeft>0);
        }
    };

    useEffect(()=>{
      if(swiperRef.current){
        setShowNext(swiperRef.current.scrollLeft+swiperRef.current.offsetWidth<swiperRef.current.scrollWidth);
        setShowPre(swiperRef.current.scrollLeft>0);
      }
    },[]);

    const onScroll=(forward:boolean)=>{
      swiperRef.current?.scrollTo({
        left: swiperRef.current.scrollLeft + (forward?swiperRef.current.clientWidth:-swiperRef.current.clientWidth),
        behavior: 'smooth', // Optionally, add smooth scrolling behavior
      });
    }

    return (
        <div style={{position:'relative', //height:'72px',
        }}>
        <div ref={swiperRef}
        style={{width:'100%',//height:'72px',
            overflow: 'auto',
            overflowX: 'auto',
            overflowY:'hidden',
            scrollBehavior: 'smooth',
            transition: 'scroll 0.3s ease-in-out'
            }} onScroll={onscroll}>
              <Stack direction={'row'} spacing={spacing}>
            {children}
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