'use client'
import { Searcher } from "@/components/searcher";
import { CalendarMonthOutlined, Checklist, DocumentScannerOutlined, Favorite, FavoriteBorderOutlined, FavoriteOutlined, FileOpenOutlined, FilePresentOutlined, FolderOutlined, HandshakeOutlined, Home, HomeOutlined, HouseOutlined, ListOutlined, Menu, Notifications, PeopleOutline, PowerOffOutlined, PowerOutlined, PowerSettingsNewOutlined, QuestionAnswerOutlined, SettingsOutlined, StickyNote2Outlined, ThumbUp, ThumbUpOutlined, TrendingUp, TrendingUpOutlined } from "@mui/icons-material";
import {AppBar, AppBarProps, Avatar, Box, Button, CSSObject, Divider, Drawer, Fab, IconButton, List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, SwipeableDrawer, Tab, Tabs, Theme, Toolbar, Typography, alpha, darken, emphasize, makeStyles, styled, useMediaQuery, useTheme} from "@mui/material";
import { Fragment, ReactNode, useState } from "react";
import { BannerAvatar } from "./avatar";
import { RoleNum } from "@/utils/roles";
import logo from "@/assets/ova_logo.svg";
import { font4, outline, outline_variant } from "../ThemeRegistry/theme_consts";
import { AppMenu, drawerMinWidth, drawerWidth } from "./app_menu";
import Image from "next/image";


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => {
    const shift=open?drawerWidth:drawerMinWidth;
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

  
export const AGCAppBar=({children}: { children: ReactNode })=> {
  const theme=useTheme();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const pages = ['Home','Egg Donor','Recipients','Cases','Events'];

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    const [anchorEl, setAnchorEl] = useState(null); // | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
          {/* <Image src={'/assets/agc_test_logo.svg'} alt="Agc Logo" style={{height:'100%',width:'auto'}}/> */}
    return(
        <Box sx={{display:'flex',width:'100%'}}>
            <AppBar position="fixed" elevation={0}
            sx={{backgroundColor:'white', //zIndex: (theme) => theme.zIndex.drawer + 1, 
            borderBottom:`1px solid ${outline_variant}`}}>
                <Toolbar >
                <Image src={logo} alt="Logo" style={{
                            width: '85px',
                            height: '27.71px',
                            marginLeft: '16px'
                        }}/>
                        <Box width={108}/>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Fragment>
                                <Tabs value={currentTabIndex} onChange={handleTabChange}>
                                  {pages.map(v=><Tab label={<Typography color={outline}>{v}</Typography>} />)}
                                    {/* <Tab sx={font4} label='Home' />
                                    <Tab sx={font4} label='Egg Donor' />
                                    <Tab sx={font4} label='Recipients' />
                                    <Tab sx={font4} label='Cases' />
                                    <Tab sx={font4} label='Events' /> */}
                                </Tabs>
                            </Fragment>
                        </Box>
          <Box flexGrow={1} display={'flex'} justifyItems={'center'}>
            <Searcher/>
          </Box> 
          <IconButton color="inherit" onClick={()=>{}} >
                <CalendarMonthOutlined />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>{}}>
                <Checklist />
          </IconButton>
          <Box width={12}/>
          <IconButton color="inherit" onClick={()=>{}}>
                <Notifications />
          </IconButton>
          <Box width={12}/>
          <BannerAvatar/>
                </Toolbar>
            </AppBar>
            <Box component={'main'} minWidth={'100%'}>
              <Toolbar />
              {children}
              </Box>
        </Box>
    )
}
