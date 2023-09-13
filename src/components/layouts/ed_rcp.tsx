'use client'
import { Searcher } from "@/components/searcher";
import { CalendarMonthOutlined, Checklist, Favorite, Home, Menu, Notifications, ThumbUp, TrendingUp } from "@mui/icons-material";
import {AppBar, AppBarProps, Avatar, Box, Button, CSSObject, Drawer, IconButton, List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, Theme, Toolbar, makeStyles, styled} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BannerAvatar } from "./avatar";
import { usePathname, useRouter } from "next/navigation";
import { RoleNum, roles } from "@/utils/roles";

const drawerWidth=240;

interface WithOpenProp extends AppBarProps{
    open?:boolean
}

const CAppBar=styled(AppBar,{shouldForwardProp: (prop)=>prop!=='open'})<WithOpenProp>(
    ({theme,open})=>({
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          })
        }));

        const openedMixin = (theme: Theme): CSSObject => ({
          width: drawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        });
        
        const closedMixin = (theme: Theme): CSSObject => ({
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          overflowX: 'hidden',
          width: `calc(${theme.spacing(7)} + 1px)`,
          [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
          },
        });

const routes=[{path:'/dashboard',text:'Home','icon':<Home/>},
{path:'/liked',text:'Liked','icon':<Favorite/>},
{path:'/trending',text:'Trending','icon':<TrendingUp/>},
{path:'/recommended',text:'Recommended','icon':<ThumbUp/>}
];

const CDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
          ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
              ...openedMixin(theme),
              '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
              ...closedMixin(theme),
              '& .MuiDrawer-paper': closedMixin(theme),
            }),
          }),
        );

export const EDRcpAppBarMenu=({role,children}: { role:RoleNum, children: React.ReactNode })=> {
    const [open,setOpen]=useState(false);
    const path=usePathname();
    
    return(
        <Box sx={{display:'flex'}}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <IconButton color="inherit"onClick={()=>setOpen(!open)}>
                <Checklist />
          </IconButton>
          <IconButton color="inherit"onClick={()=>setOpen(!open)}>
                <Notifications />
          </IconButton>
          <BannerAvatar/>
                </Toolbar>
            </AppBar>
            <CDrawer variant="permanent" open={open}>
              <Toolbar />
              <List>
              {routes.map((v)=>{
                const selected=path.startsWith(v.path)||path.startsWith(`/${roles[role].path}${v.path}`);

                return (<ListItemButton key={v.path} className="mb"
                selected={selected} color='black'
                sx={{
                  borderRadius:100,
                  '&.Mui-selected':{backgroundColor:'primary.main'}
                  
                  // color:selected?'primary.main':undefined, 
                  // backgroundColor:'primary.main'
                //backgroundColor: selected?(theme)=>theme.palette.augmentColor({color:theme.palette.primary}).main:undefined
                }}
                >
                  <ListItemIcon>{v.icon}</ListItemIcon>
                  <ListItemText primary={v.text}/>
                </ListItemButton>)
              })}
                </List> 
            </CDrawer>

            {children}
        </Box>
    )
}

// const SuccessSlider = styled(ListItemButton)<ListItemButtonProps>(({ theme , selected}) => ({
//   // width: 300,
//   color: selected?theme.palette.success.main:theme.palette.success.main,
//   '& .Mui-selected': {
//     // '&:hover, &.Mui-focusVisible': {
//       backgroundColor:theme.palette.primary.main,
//       color: theme.palette.success.main,
//       // boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
//     // },
//   },
// }));