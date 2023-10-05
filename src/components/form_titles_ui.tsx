import { CheckCircleOutline, Circle } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, alpha } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";

type title={
    title:string,
    selected?:boolean,
    icon?:ReactNode,
    check?:boolean,
    dot?:boolean,
    href?:string
}
export default function FormTitlesUI({titles,onClick}: {titles:title[],onClick:(title:title,index:number)=>void}) {
    const primary90='#FFDBCE';
    return(
            <List >
                {titles.map(({title,selected,icon,check,dot,href}, index) => {
                    const button=<ListItemButton selected={selected} sx={{
                        borderRadius: '100px',
                        // backgroundColor: selected ? primary90: undefined,
                        '&.Mui-selected': {
                            backgroundColor: primary90,
                            '&:hover, &.Mui-focusVisible': {
                              backgroundColor:alpha(primary90,0.86),
                            }
                          },
                    }} onClick={href==null?(ev)=>onClick({title,selected,icon,check,dot}, index):undefined}>
                        <ListItemIcon>
                            {icon??(check?<CheckCircleOutline color="primary"/>:dot?<Circle sx={{color:primary90}}/>:null)}
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant={selected?'subtitle3':'body2'}>{title}</Typography>} sx={{
                            ml:'-20px',
                        }}/>
                    </ListItemButton>;
                    return <div key={index}>
                    {href==null?button:<Link href={href} passHref>{button}</Link>}
                    {index<titles.length-1 && <Divider  sx={{my:'8px'}}/>}
                </div>
})}
            </List>
    );
}