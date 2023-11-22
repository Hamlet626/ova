import { CheckCircleOutline, Circle, Delete } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, alpha } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import { primary90 } from "./ThemeRegistry/theme_consts";

type title={
    title:string,

    /// primary highlight if selected
    selected?:boolean,

    ///icon > check > dot > display nothing
    icon?:ReactNode,
    check?:boolean,
    dot?:boolean,

    /// href for redirected path, useful if it's a server components without [onClick]
    href?:string,

    /// icons appear when hovering on the listTile, use IconButton for Node components
    actions?:(iconButtonProps:any)=>ReactNode[]
}

export default function FormTitlesUI({titles,onClick}: {titles:title[],onClick?:(title:title,index:number)=>void}) {
    
    return(
            <List >
                {titles.map(({title,selected,icon,check,dot,href,actions}, index) => {
                    const props=href==null?{}:{LinkComponent:Link, href};
                    
                    return <div key={index}>
                        <ListItemButton {...props}
                    selected={selected} sx={{
                        borderRadius: '100px',
                        // backgroundColor: selected ? primary90: undefined,
                        '&.Mui-selected': {
                            backgroundColor: primary90,
                            '&:hover, &.Mui-focusVisible': {
                              backgroundColor:alpha(primary90,0.86),
                            },
                          },
                          ...actions!=null?{'&:hover .hidden': {
                            display:'block',
                          }}:{}
                    }} onClick={onClick!=null?(ev)=>onClick({title,selected,icon,check,dot}, index):undefined}>
                        <ListItemIcon>
                            {icon??(check?<CheckCircleOutline color="primary"/>:dot?<Circle sx={{color:primary90}}/>:null)}
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant={selected?'subtitle3':'body2'}>{title}</Typography>} sx={{
                            ml:'-20px',
                        }}/>
                        {actions!=null && 
                        actions({className:"hidden", size:"small", disableRipple:true , sx:{display:'none',p:0,m:0}})}
                    </ListItemButton>
                    {index<titles.length-1 && <Divider  sx={{my:'8px'}}/>}
                    </div>
})}
            </List>
    );
}