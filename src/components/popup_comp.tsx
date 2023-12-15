'use client'
import { Menu, MenuProps } from "@mui/material";
import { MouseEventHandler, ReactNode, useState } from "react";

export const PopupComp=({compBuilder,menuBuilder,...menuProps}:
    {compBuilder:(onClick:MouseEventHandler<HTMLButtonElement>)=>ReactNode,
        menuBuilder:(onClose:Function)=>ReactNode,
    }&Omit<MenuProps,'open'>)=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return <div>
    {compBuilder((event)=>{
            event.stopPropagation();
            setAnchorEl(event.currentTarget);
        })}
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}} {...menuProps}>
    {menuBuilder(()=>setAnchorEl(null))}
    </Menu>
    </div>
}