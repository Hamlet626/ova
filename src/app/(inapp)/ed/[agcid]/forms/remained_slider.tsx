'use client'

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Scrollbar } from 'swiper/modules';
import { Card, CardActionArea, CardContent, Fab, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export const RemainedSlider=({remainedData})=>{
    return (
        <Swiper slidesPerView={'auto'} spaceBetween={16} height={72}
        freeMode scrollbar mousewheel 
        // navigation={{nextEl:<Fab ><ArrowForward/></Fab>}}
        modules={[Navigation,FreeMode,Scrollbar,Mousewheel]}>
            {...(remainedData.map((v)=>(<SwiperSlide><Card sx={{display: 'inline-block'}}>
                <CardActionArea>
                    <CardContent sx={{}}>
                        <Typography variant="subtitle2" color={'secondary'}>{v.title}</Typography>
                        <Typography variant="subtitle2" noWrap>{v.subs.remained.join(', ')}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card></SwiperSlide>)))}
        </Swiper>
    );
}