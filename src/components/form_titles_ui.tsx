import { CheckCircleOutline, Circle } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ReactNode } from "react";

type title={
    title:string,
    selected?:boolean,
    icon?:ReactNode,
    check?:boolean,
    dot?:boolean,
}
export default function FormTitlesUI({titles,onClick}: {titles:title[],onClick:(title:title,index:number)=>void}) {
    const primary90='#FFDBCE';
    return(
            <List >
                {titles.map(({title,selected,icon,check,dot}, index) => (
                <>
                    <ListItemButton key={'b'+index} sx={{
                        borderRadius: '100px',
                        backgroundColor: selected ? primary90: undefined,
                    }}>
                        <ListItemIcon>
                            {icon??(check?<CheckCircleOutline color="primary"/>:dot?<Circle sx={{color:primary90}}/>:null)}
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant={selected?'subtitle3':'body2'}>{title}</Typography>} sx={{
                            ml:'-20px',
                        }}/>
                    </ListItemButton>
                    {index<titles.length-1 && <Divider key={'d'+index} sx={{my:'8px'}}/>}
                </>
                ))}
            </List>
    );
}