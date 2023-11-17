'use client'
import { outline, neutral96 } from "@/components/ThemeRegistry/theme_consts";
import { BackButton } from "@/components/back_button";
import { Remove, HistoryToggleOff, BorderColor } from "@mui/icons-material";
import { Stack, ButtonGroup, Button, Typography, Box } from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { ContentTabs } from "./content_tabs";

export const StickyContent=({children}:{children:ReactNode})=>{

    const swiperRef=useRef<HTMLDivElement|null>(null);
    const [showNext,setShowNext]=useState(false);

    const onscroll=()=>{
        if(swiperRef.current){
          setShowNext(swiperRef.current.scrollTop+swiperRef.current.offsetHeight<swiperRef.current.scrollHeight);
        //   setShowPre(swiperRef.current.scrollLeft>0);
        }
    };

    return <Stack flexGrow={1} pl={10} pr={3} pt={3} alignItems={'stretch'} sx={{overflowY:'auto'}}
    onScroll={onscroll}>
                <Stack direction={'row'} alignItems={'center'} position={''}>
                    <BackButton text="All Donors" link="/agc/eds"/>
                    <Box flexGrow={1}/>
                    <ButtonGroup variant="outlined">
                    <Button startIcon={<Remove/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Remove</Typography>
                    </Button>
                    <Button startIcon={<HistoryToggleOff/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Log</Typography>
                    </Button>
                    <Button startIcon={<BorderColor/>} sx={{borderColor:outline,bgcolor:neutral96}}>
                        <Typography color={'black'}>Edit</Typography>
                    </Button>
                    </ButtonGroup>
                </Stack>
                {children}
            </Stack>
}