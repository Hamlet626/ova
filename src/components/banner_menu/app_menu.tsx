
import { CalendarMonthOutlined, Egg, EggAlt, FavoriteBorderOutlined, FolderOutlined, HandshakeOutlined, HomeOutlined, ListOutlined, PeopleOutline, PowerSettingsNewOutlined, SettingsOutlined, StickyNote2Outlined, ThumbUpOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { AppBarProps, Box, Button, CSSObject, Divider, Drawer, Fab, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, SwipeableDrawer, Theme, Toolbar, alpha, darken, emphasize, makeStyles, styled, useMediaQuery, useTheme} from "@mui/material";
import React, { ReactNode, SyntheticEvent, useContext, } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RoleNum, roles } from "@/utils/roles";
import { neutral96, } from "../ThemeRegistry/theme_consts";
import { signOut, useSession } from "next-auth/react";
import { AppLayoutContext } from "./ed_rcp";
import Link from "next/link";


export const drawerWidth=360;
export const drawerMinWidth=80;

interface WithOpenListButProp extends AppBarProps{
    highlight?:boolean,
    open?:boolean
  }
  
  const NavItem = styled(ListItemButton,{shouldForwardProp: (prop)=>prop!=='open'&&prop!=='highlight'})<WithOpenListButProp>(({ theme , open, highlight}) => ({
    marginBottom:8,
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


// const home={path:'/dashboard',text:'Home','icon':<HomeOutlined/>};


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
    width: drawerMinWidth,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(${theme.spacing(8)} + 1px)`,
    // },
  });


const CDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => {
      open=(!!theme.breakpoints.up('lg'))&&open;
      return {
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
      };
    });

  //   const routes=(role:RoleNum,agcid?:string)=>{
  //     if(role===RoleNum.ED)
  //     return [
  //     {path:'/forms',text:'Forms','icon':<StickyNote2Outlined/>},
  //   {path:'/files',text:'Files','icon':<FolderOutlined/>},
  //   {path:'/agencies',text:'Agencies','icon':<PeopleOutline/>},
  //   {path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
  //   {path:'/calendar',text:'Events Calendar','icon':<CalendarMonthOutlined/>},
  //   {path:'/setting',text:'Setting','icon':<SettingsOutlined/>},
  //   ]
  //   ///for EDs, add ..agcid to the path, e.g. /forms -> /ed/agcid/forms
  //   .map((v)=>({...v,path:(`/${roles[role].path}${agcid==null?'':`/${agcid}`}${v.path}`)}));

  //   return [
  //     {path:'/eds',text:'Egg Donors','icon':<EggAlt/>},
  //   {path:'/liked',text:'Liked','icon':<FavoriteBorderOutlined/>},
  //   {path:'/trending',text:'Trending','icon':<TrendingUpOutlined/>},
  //   {path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
  //   {path:'/lists',text:'Custom Lists','icon':<ListOutlined/>},
  //   {path:'/setting',text:'Setting','icon':<SettingsOutlined/>},
  //   ]
  //   .map((v)=>({...v,path:(`/${roles[role].path}/${v.path}`)}));
  // }


export type MenuItemInfo={
  path:string,
  text:string,
  icon:ReactNode,
  sub?:MenuItemInfo[]
}

  ///xs: __ -> swipeable
  ///sm: shrink -> swipeable
  ///md: shrink -> swipeable
  ///lg: shrink -> fix
  ///xl: default expand -> fix
export const AppMenu=({role,open,fixed,routesInfo}:
  {role:RoleNum, open?:boolean, fixed?:boolean, routesInfo:MenuItemInfo[]})=>{
    const path=usePathname();
    const router=useRouter();
    const theme=useTheme();
    const {setMenuOpen}=useContext(AppLayoutContext)!;
    // const drawerFix=useMediaQuery(theme.breakpoints.up('lg'));
  
    const content=
    <Stack sx={{px:'12px',backgroundColor:neutral96, flexGrow:1}}>
    <List sx={{flexGrow:1,overflowY:'auto',overflowX:'hidden',height:0}}>

      <Box height={16}/>

      {routesInfo.flatMap((v,i)=>{
        const selected=path.startsWith(v.path);
    
        const tab = (<NavItem key={v.path+(fixed?'1':'0')} LinkComponent={Link} href={v.path} highlight={i===0}
        selected={selected} open={open}
        /// sx={{'&.Mui-selected':{backgroundColor:'primary.main'}}}
        >
          <ListItemIcon sx={i===0?{color:"white"}:{}}>{v.icon}</ListItemIcon>
          <ListItemText primary={v.text}/>
        </NavItem>);
    
    if(v.sub!=null){
      return ([
      <Divider key={v.path+(fixed?'10':'00')}/>,
      tab,
      ...open ?[ v.sub.map(v=><NavItem key={v.path+(fixed?'1':'0')} selected={path.startsWith(v.path)} open
      LinkComponent={Link} href={v.path}
      sx={{pl:'32px'}}
    >
      <ListItemText primary={v.text}/>
    </NavItem>)]:[],
      <Divider key={v.path+(fixed?'11':'01')}/>
      ])
    }
    // if(v.path.includes('/agencies')){
    //   return <AgencyTab key={v.path+(fixed?'1':'0')}>{tab}</AgencyTab>
    // }
  
    return [tab];
  })}
    </List>
    {open?<Button variant="outlined"
    color='primary'
    size='large'
    onClick={(ev)=>signOut({callbackUrl:'/'})}
    startIcon={<PowerSettingsNewOutlined/>}
    sx={{width:'100%',mb:5,px:'12px'}}>
    {/* <PowerSettingsNewOutlined/> */}
    {'log out'}
    </Button>:<IconButton color='primary' 
    onClick={(ev)=>signOut({callbackUrl:'/'})}
    sx={{border:'solid 1px',mb:5,px:'12px'}} size='large'>
      <PowerSettingsNewOutlined/></IconButton>}
    </Stack>;
  
  
  if(!!fixed){
    return (<CDrawer variant="permanent" open={open} sx={{display:{xs:'none',sm:'flex'}}}>
                <Toolbar />
                {content}
              </CDrawer>
    );}
    else return (
      <SwipeableDrawer open={open} onClose={(event: SyntheticEvent<{}, Event>)=> {setMenuOpen(false);} } 
      onOpen={(event: SyntheticEvent<{}, Event>)=> {setMenuOpen(true);} }
      sx={{display:{md:'flex',lg:'none'}}}>
                    <Toolbar />
                    {content}
                  </SwipeableDrawer>
        );
  }


  const AgencyTab=({children}:{children:React.ReactNode})=>{
    let {data}=useSession({required:true});
    if((data?.user?.agencies??[]).length>1)return <>{children}</>;
    return null;
  }
  