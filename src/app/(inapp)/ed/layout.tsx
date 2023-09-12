'use client'
import {AppBar, AppBarProps, Box, Toolbar, styled} from "@mui/material";


const drawerWidth=240;

interface WithOpenProp extends AppBarProps{
    open?:boolean
}

const CAppBarStyle=styled(AppBar,{shouldForwardProp: (prop)=>prop!=='open'})<WithOpenProp>(
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

export default async function EDAppBarMenu({children}: { children: React.ReactNode }) {
    return(
        <Box sx={{display:'flex'}}>
            <CAppBarStyle open={true}>
                <Toolbar>

                </Toolbar>
            </CAppBarStyle>
            {children}
        </Box>
    )
}