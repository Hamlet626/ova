'use client'
import { primary90 } from "@/components/ThemeRegistry/theme_consts";
import { Search } from "@mui/icons-material";
import { Box, Button, Chip, Stack } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useState } from "react"

export const EDTraitsSearcher=({tags}:{tags:string[]})=>{
    const [selected, setSelected]=useState<string[]>([]);
    return <Stack>
        <Grid2 container>
            {tags.map(v=>{
                const select=selected.includes(v);
                return <Chip label={v} clickable color={select?primary90:'default'}
                onClick={(ev)=>{
                    if(select)setSelected(selected.filter(s=>s!=v))
                    else setSelected([...selected,v]);
                }}/>
            })}
             </Grid2>
             <Box height={21}/>
             <Button startIcon={<Search/>} variant="contained">
                Search Egg Donors by Tags
             </Button>
    </Stack>
}