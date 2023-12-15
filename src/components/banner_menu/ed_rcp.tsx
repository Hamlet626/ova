'use client'
import { Searcher } from "@/components/searcher";
import { CalendarMonthOutlined, Checklist, Menu, Notifications } from "@mui/icons-material";
import {AppBar, Box, IconButton, Toolbar, styled, useMediaQuery, useTheme} from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { BannerAvatar } from "./avatar";
import { RoleNum } from "@/utils/roles";
import { outline_variant } from "../ThemeRegistry/theme_consts";
import { AppMenu, MenuItemInfo, drawerMinWidth, drawerWidth } from "./app_menu";

export const AppLayoutContext = createContext<{ menuOpen: boolean; menuWidth: number; setMenuOpen: Dispatch<SetStateAction<boolean>>; }|null>(null);

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => {
    const shift=theme.breakpoints.up('sm')?open?drawerWidth:drawerMinWidth:0;
    return ({
      display:'flex', flexDirection:'column',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width:`calc(100% - ${shift}px)`,
    height:'100vh',
    overflowY:'auto',
    ///todo:remove animation or make it better
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  });
});

  
export const EDRcpAppBarMenu=({role,children,routesInfo}: { role:RoleNum, children: ReactNode, routesInfo:MenuItemInfo[] })=> {
  const theme=useTheme();
  const drawerExpand=useMediaQuery(theme.breakpoints.up('xl'));
  const drawerFix=useMediaQuery(theme.breakpoints.up('lg'));
  const drawerDisplay=useMediaQuery(theme.breakpoints.up('sm'));
  const [menuOpen,setMenuOpen]=useState(drawerExpand);

  useEffect(()=>{setMenuOpen(drawerExpand);},[drawerExpand]);
    
          {/* <Image src={'/assets/agc_test_logo.svg'} alt="Agc Logo" style={{height:'100%',width:'auto'}}/> */}
    return(<AppLayoutContext.Provider value={{menuOpen, setMenuOpen, menuWidth:drawerDisplay?drawerFix&&menuOpen?drawerWidth:drawerMinWidth:0}}>
        <Box sx={{display:'flex',width:'100%'}}>
            <AppBar position="fixed" elevation={0}
            sx={{backgroundColor:'white', zIndex: (theme) => theme.zIndex.drawer + 1, 
            borderBottom:`1px solid ${outline_variant}`}}>
                <Toolbar >
                <IconButton 
            color="inherit"onClick={()=>setMenuOpen(!menuOpen)}edge="start">
                <Menu />
          </IconButton>
          <Box flexGrow={1} display={'flex'} justifyItems={'center'}>
            <Searcher/>
          </Box> 
          <IconButton color="inherit" onClick={()=>setMenuOpen(!menuOpen)} >
                <CalendarMonthOutlined />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>setMenuOpen(!menuOpen)}>
                <Checklist />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>setMenuOpen(!menuOpen)}>
                <Notifications />
          </IconButton>
          <Box width={12}/>
          <BannerAvatar/>
                </Toolbar>
            </AppBar>
            <AppMenu role={role} open={drawerFix&&menuOpen} fixed routesInfo={routesInfo}/>
            <AppMenu role={role} open={menuOpen} routesInfo={routesInfo}/>
            <Main open={drawerFix&&menuOpen}>
        <Toolbar />
        <Box maxHeight={'calc(100vh - 64.5px)'} flexGrow={1}>
        {children}
        </Box>
        </Main>
        </Box>
        </AppLayoutContext.Provider>
    )
}
