'use client'
import { EDStatus } from "@/utils/types/status";
import { ArrowDropDown } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Menu } from "@mui/material";
import { MouseEventHandler, ReactNode, useState } from "react";

export const PopupComp=({compBuilder,menuBuilder}:
    {compBuilder:(onClick:MouseEventHandler<HTMLButtonElement>)=>ReactNode,
        menuBuilder:(onClose:Function)=>ReactNode})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return <div>
    {compBuilder((event)=>{
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        })}
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}}>
    {menuBuilder(()=>setAnchorEl(null))}
    </Menu>
    </div>
}