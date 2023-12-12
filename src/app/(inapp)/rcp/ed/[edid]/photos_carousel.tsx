'use client'
import Carousel from "react-material-ui-carousel"
import Image from "next/image";
import { Box } from "@mui/material";

export const PhotosCarousel=({photos}:{photos:string[]})=>{
    return <Carousel height={274}
    indicatorContainerProps={{style:{zIndex: 2,marginTop:'-32px',paddingRight:'24px',
    position: "relative",textAlign: 'right'}}} 
    // sx={{position:'absolute', top:0,bottom:0,left:0,right:0}}
    >
        {//Object.entries((filesData.filter(v=>v.id==='photos')[0]??{}).files)
        photos.map(v=>(<Image src={v} alt={'Egg Donor Photo'} fill objectFit='cover'
        ></Image>
        ))}
    </Carousel>
}