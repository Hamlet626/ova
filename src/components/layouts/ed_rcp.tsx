'use client'
import { Searcher } from "@/components/searcher";
import { CalendarMonthOutlined, Checklist, DocumentScannerOutlined, Favorite, FavoriteBorderOutlined, FavoriteOutlined, FileOpenOutlined, FilePresentOutlined, FolderOutlined, HandshakeOutlined, Home, HomeOutlined, HouseOutlined, ListOutlined, Menu, Notifications, PeopleOutline, PowerOffOutlined, PowerOutlined, PowerSettingsNewOutlined, QuestionAnswerOutlined, SettingsOutlined, StickyNote2Outlined, ThumbUp, ThumbUpOutlined, TrendingUp, TrendingUpOutlined } from "@mui/icons-material";
import {AppBar, AppBarProps, Avatar, Box, Button, CSSObject, Divider, Drawer, Fab, IconButton, List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, SwipeableDrawer, Theme, Toolbar, alpha, darken, emphasize, makeStyles, styled, useMediaQuery, useTheme} from "@mui/material";
import { useState } from "react";
import { BannerAvatar } from "./avatar";
import { RoleNum } from "@/utils/roles";
import { outline_variant } from "../ThemeRegistry/theme_consts";
import { AppMenu, drawerWidth } from "./app_menu";


export const EDRcpAppBarMenu=({role,agcid,children}: { role:RoleNum, agcid?:string, children: React.ReactNode })=> {
  const theme=useTheme();
  const drawerExpand=useMediaQuery(theme.breakpoints.up('xl'));
  const [open,setOpen]=useState(drawerExpand);
    
    return(
        <Box sx={{display:'flex'}}>
            <AppBar position="fixed" elevation={0}
            sx={{backgroundColor:'white', zIndex: (theme) => theme.zIndex.drawer + 1, 
            borderBottom:`1px solid ${outline_variant}`}}>
                <Toolbar >
                <IconButton 
            color="inherit"onClick={()=>setOpen(!open)}edge="start">
                <Menu />
          </IconButton>
          {/* <Image src={'/assets/agc_test_logo.svg'} alt="Agc Logo" style={{height:'100%',width:'auto'}}/> */}
          <Box flexGrow={1} display={'flex'} justifyItems={'center'}>
            <Searcher/>
          </Box> 
          <IconButton color="inherit" onClick={()=>setOpen(!open)} >
                <CalendarMonthOutlined />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>setOpen(!open)}>
                <Checklist />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>setOpen(!open)}>
                <Notifications /><DocumentScannerOutlined/>
          </IconButton>
          <Box width={12}/>
          <BannerAvatar/>
                </Toolbar>
            </AppBar>
            (<AppMenu role={role} open={open} agcid={agcid} fixed/>)
            (<AppMenu role={role} open={open} agcid={agcid} />)
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        {children}
        </Box>
        </Box>
    )
}
