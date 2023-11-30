'use client'
import { OVA_very_soft_grey } from "@/components/ThemeRegistry/theme_consts";
import { FormTempStatusCpx } from "@/utils/form/form_utils/status";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RemainedSlider } from "./remained_slider";

export const IncomleteForm=({data,agcid}:{data:FormTempStatusCpx[],agcid:string})=>{

  const router=useRouter();
  return <RemainedSlider>
  {data.map((v,i)=>(<Card elevation={0} sx={{display: 'inline-block',flexShrink: 0, bgcolor:OVA_very_soft_grey}}> 
  <CardActionArea onClick={()=>router.push(`/ed/${agcid}/forms/detail/${v.index}?section=${encodeURIComponent(v.subs.remained[0])}`)}>
      <CardContent>
          <Typography variant="subtitle2" color={'secondary'}>{v.title}</Typography>
          <Typography variant="subtitle2" noWrap>{v.subs.remained.join(', ')}</Typography>
      </CardContent>
  </CardActionArea>
</Card> ))}
      </RemainedSlider>
      
}