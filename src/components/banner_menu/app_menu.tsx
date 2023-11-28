
import { CalendarMonthOutlined, FavoriteBorderOutlined, FolderOutlined, HandshakeOutlined, HomeOutlined, ListOutlined, PeopleOutline, PowerSettingsNewOutlined, SettingsOutlined, StickyNote2Outlined, ThumbUpOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { AppBarProps, Box, CSSObject, Divider, Drawer, Fab, List, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Theme, Toolbar, alpha, darken, emphasize, makeStyles, styled, useMediaQuery, useTheme} from "@mui/material";
import React, { SyntheticEvent, } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RoleNum, roles } from "@/utils/roles";
import { neutral96, } from "../ThemeRegistry/theme_consts";
import { signOut, useSession } from "next-auth/react";


export const drawerWidth=360;
export const drawerMinWidth=80;

interface WithOpenListButProp extends AppBarProps{
    highlight?:boolean,
    open?:boolean
  }
  
  const NavItem = styled(ListItemButton,{shouldForwardProp: (prop)=>prop!=='open'&&prop!=='highlight'})<WithOpenListButProp>(({ theme , selected, open, highlight}) => ({
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


const home={path:'/dashboard',text:'Home','icon':<HomeOutlined/>};


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

    const routes=(role:RoleNum,agcid?:string)=>{
      if(role===RoleNum.ED)
      return [
      {path:'/forms',text:'Forms','icon':<StickyNote2Outlined/>},
    {path:'/files',text:'Files','icon':<FolderOutlined/>},
    {path:'/agencies',text:'Agencies','icon':<PeopleOutline/>},
    {path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
    {path:'/calendar',text:'Events Calendar','icon':<CalendarMonthOutlined/>},
    {path:'/setting',text:'Setting','icon':<SettingsOutlined/>},
    ]
    ///for EDs, add ..agcid to the path, e.g. /forms -> /ed/agcid/forms
    .map((v)=>({...v,path:(`/${roles[role].path}${agcid==null?'':`/${agcid}`}${v.path}`)}));

    return [
    {path:'/liked',text:'Liked','icon':<FavoriteBorderOutlined/>},
    {path:'/trending',text:'Trending','icon':<TrendingUpOutlined/>},
    {path:'/recommended',text:'Recommended','icon':<ThumbUpOutlined/>},
    {path:'/cases',text:'Cases','icon':<HandshakeOutlined/>},
    {path:'/lists',text:'Custom Lists','icon':<ListOutlined/>},
    {path:'/setting',text:'Setting','icon':<SettingsOutlined/>},
    ].map((v)=>({...v,path:(`/${roles[role].path}/${v.path}`)}));
  }

export const AppMenu=({role,open,agcid,fixed}:{role:RoleNum, open?:boolean, agcid?:string, fixed?:boolean})=>{
    const path=usePathname();
    const router=useRouter();
    const theme=useTheme();
    // const drawerFix=useMediaQuery(theme.breakpoints.up('lg'));
  
    const content=
    <Box sx={{px:'12px',backgroundColor:neutral96, flexGrow:1, display:"flex",flexDirection: 'column'}}>
    <List sx={{flexGrow:1,}}>
      <Box height={16}/>
  
      <NavItem key={'home'+fixed?'1':'0'} open={open} highlight
      selected={path.endsWith(home.path)} 
      onClick={()=>router.push(`/${roles[role].path}${agcid==null?'':`/${agcid}`}${home.path}`)}
      // sx={{backgroundColor:'primary.main',color:'white'}}
    >
      <ListItemIcon sx={{color:"white"}}>{home.icon}</ListItemIcon>
      <ListItemText primary={home.text}/>
    </NavItem>
    <Box height={40}/>
  {routes(role,agcid).map((v)=>{
    const selected=path.startsWith(v.path);
    
    const tab = (<NavItem key={v.path+(fixed?'1':'0')} 
    selected={selected} open={open}
      onClick={()=>router.push(`${v.path}`)}
    /// sx={{'&.Mui-selected':{backgroundColor:'primary.main'}}}
    >
      <ListItemIcon >{v.icon}</ListItemIcon>
      <ListItemText primary={v.text}/>
    </NavItem>);
  
    if(v.path.includes('/calendar')){
      return (<div key={v.path+(fixed?'1':'0')}>
      <Divider/>
      {tab}
      {open && <NavItem selected={selected} open
      onClick={()=>router.push(`/appointments`)}
    sx={{pl:'32px'}}
    >
      <ListItemText primary='Appointment'/>
    </NavItem>}
      <Divider/>
      </div>)
    }
    if(v.path.includes('/agencies')){
      return <AgencyTab key={v.path+(fixed?'1':'0')}>{tab}</AgencyTab>
    }
  
    return tab;
  })}
    </List>
    <Fab variant={open?"extended":"circular"} color='secondary'
    onClick={(ev)=>signOut({callbackUrl:'/'})}
    sx={{width:'100%',bottom:46,px:'12px'}}>
    <PowerSettingsNewOutlined/>
    {open&&'log out'}
    </Fab>
    </Box>;
  
  
  if(!!fixed){
    return (<CDrawer variant="permanent" open={open} sx={{display:{xs:'none',sm:'flex'}}}>
                <Toolbar />
                {content}
              </CDrawer>
    );}
    else return (
      <SwipeableDrawer open={open} onClose={(event: SyntheticEvent<{}, Event>)=> {} } 
      onOpen={(event: SyntheticEvent<{}, Event>)=> {} }
      sx={{display:{md:'block',lg:'none'}}}>
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
  