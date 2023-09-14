'use client'
import { Searcher } from "@/components/searcher";
import { CalendarMonthOutlined, Checklist, Favorite, FavoriteBorderOutlined, FavoriteOutlined, FileOpenOutlined, FilePresentOutlined, FolderOutlined, HandshakeOutlined, Home, HomeOutlined, HouseOutlined, ListOutlined, Menu, Notifications, PeopleOutline, PowerOffOutlined, PowerOutlined, PowerSettingsNewOutlined, QuestionAnswerOutlined, SettingsOutlined, StickyNote2Outlined, ThumbUp, ThumbUpOutlined, TrendingUp, TrendingUpOutlined } from "@mui/icons-material";
import {AppBar, AppBarProps, Avatar, Box, Button, CSSObject, Divider, Drawer, Fab, IconButton, List, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, Theme, Toolbar, alpha, darken, emphasize, makeStyles, styled} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BannerAvatar } from "./avatar";
import { usePathname, useRouter } from "next/navigation";
import { RoleNum, roles } from "@/utils/roles";
import { neutral96, outline_variant } from "../ThemeRegistry/theme_consts";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

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
          width: 80,
          // [theme.breakpoints.up('sm')]: {
          //   width: `calc(${theme.spacing(8)} + 1px)`,
          // },
        });

        const home={path:'/dashboard',text:'Home','icon':<HomeOutlined/>};

const routes=[[
  {path:'/forms',text:'Forms','icon':<StickyNote2Outlined/>},
{path:'/file',text:'Files','icon':<FolderOutlined/>},
{path:'/agenciese',text:'Agencies','icon':<PeopleOutline/>},
{path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
{path:'/calendar',text:'Events Calendar','icon':<CalendarMonthOutlined/>},
{path:'/seeting',text:'Setting','icon':<SettingsOutlined/>},
],
  [
{path:'/liked',text:'Liked','icon':<FavoriteBorderOutlined/>},
{path:'/trending',text:'Trending','icon':<TrendingUpOutlined/>},
{path:'/recommended',text:'Recommended','icon':<ThumbUpOutlined/>},
{path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
{path:'/lists',text:'Custom Lists','icon':<ListOutlined/>},
{path:'/seeting',text:'Setting','icon':<SettingsOutlined/>},
]
];

interface WithOpenListButProp extends AppBarProps{
  highlight?:boolean,
  open?:boolean
}

const NavItem = styled(ListItemButton,{shouldForwardProp: (prop)=>prop!=='open'&&prop!=='highlight'})<WithOpenListButProp>(({ theme , selected, open, highlight}) => ({
  // width: 300,
  // color: selected?theme.palette.success.main:theme.palette.success.main,
  marginBottom:8,
  // '&:hover, &.Mui-focusVisible': {
  //   backgroundColor:'white',
  // },
  // '&.Mui-selected': {
  //   // '&:hover, &.Mui-focusVisible': {
  //     backgroundColor: theme.palette.common.white,
  //     // color: 'white',
  //   //   boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
  //   // },
  //   // '&:hover, &.Mui-focusVisible': {
  //   //   backgroundColor:alpha(theme.palette.primary.main,0.86),
  //   // }
  // },
  ...(highlight? 
    {///the default white/primary color
      backgroundColor:theme.palette.primary.main,color:'white',

      ///we still want white/primary style even after selected,
      ///try comment below lines and see
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      '&:hover, &.Mui-focusVisible': {
        backgroundColor:alpha(theme.palette.primary.main,0.86),
      }
    },
    ///we still want white/primary style even after hover,
      ///try comment below lines and see
    '&:hover, &.Mui-focusVisible': {
        backgroundColor:alpha(theme.palette.primary.main,0.86),
      }
    }:
    {'&.Mui-selected': {
        backgroundColor: theme.palette.common.white,}}
  ),


  borderRadius:open?100:16,
  transition:theme.transitions.create('border-radius',
  { easing:theme.transitions.easing.sharp,
    duration: open?theme.transitions.duration.enteringScreen:theme.transitions.duration.leavingScreen
  })
}));

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
    const router=useRouter();
    
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
                <Notifications />
          </IconButton>
          <Box width={12}/>
          <BannerAvatar/>
                </Toolbar>
            </AppBar>
            <CDrawer variant="permanent" open={open}>
              <Toolbar />
              <Box sx={{px:'12px',backgroundColor:neutral96, flexGrow:1, display:"flex",flexDirection: 'column'}}>
                <List sx={{flexGrow:1,}}>
                  <Box height={16}/>

                  <NavItem key={'home'} open={open} highlight
                  selected={path.startsWith(home.path)||path.startsWith(`/${roles[role].path}${home.path}`)} 
                  onClick={()=>router.push(`/${roles[role].path}${home.path}`)}
                  // sx={{backgroundColor:'primary.main',color:'white'}}
                >
                  <ListItemIcon sx={{color:"white"}}>{home.icon}</ListItemIcon>
                  <ListItemText primary={home.text}/>
                </NavItem>
                <Box height={40}/>
              {routes[role].map((v)=>{
                const selected=path.startsWith(v.path)||path.startsWith(`/${roles[role].path}${v.path}`);
                
                const tab = (<NavItem key={v.path} selected={selected} open={open}
                  onClick={()=>router.push(`/${roles[role].path}${v.path}`)}
                // sx={{'&.Mui-selected':{backgroundColor:'primary.main'}}}
                >
                  <ListItemIcon >{v.icon}</ListItemIcon>
                  <ListItemText primary={v.text}/>
                </NavItem>);

                if(v.path==='/calendar'){
                  return(<>
                  <Divider/>
                  {tab}
                  {open && [<NavItem key={v.path} selected={selected} open
                  onClick={()=>router.push(`/${roles[role].path}/appointments`)}
                sx={{pl:'32px'}}
                >
                  <ListItemText primary='Appointment'/>
                </NavItem>]}
                  <Divider/>
                  </>)
                }

                return tab;
              })}
                </List>
                <Fab variant={open?"extended":"circular"} color='secondary'
                sx={{width:'100%',bottom:46,px:'12px'}}>
                <PowerSettingsNewOutlined/>
                {open&&'log out'}
                </Fab>
                </Box>
            </CDrawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        {children}
        </Box>
        </Box>
    )
}
