'use client'
import { useEffect } from 'react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/system/Stack';
import {alpha, createTheme, ThemeProvider, Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {Toolbar} from "@mui/material";
import {CheckCircle, CheckCircleOutline, Circle, CircleOutlined} from "@mui/icons-material";
import theme from "@/components/ThemeRegistry/theme";
import {primary90,neutural96} from "@/components/ThemeRegistry/theme_consts";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from "@mui/system";


export default function customize_Form() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{
                width: '297px',
                height:'941px',
                backgroundColor: 'white',
                mt:'-25px',
                boxShadow:'8px,22px,75px,2px,rgba(92, 104, 126, 0.12)',
            }}>
                <Typography variant="h4" sx={{fontFamily: 'roboto.style.fontFamily',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '0.15',
                    mt:'71px',
                    ml:'80px',
                    width:'57px',
                    height:'24px',
                }}>
                    Sign Up
                </Typography>
                <Typography sx={{fontFamily: 'roboto.style.fontFamily',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                    mt:'38px',
                    ml:'80px',
                    width:'169px',
                    height:'32px',
                }}>
                    Create Form
                </Typography>
                <List sx={{
                    mt:"16px",
                    ml:"80px",
                    width:'197px',
                    height:'auto',
                    gap:'12px',
                }}>
                    {['Basic Information', 'Family & Others', 'Personal Medical', 'Other A', 'Other B'].map((text, index) => (
                        <div key={text}>
                            <ListItem key={text} disablePadding >
                                <ListItemButton sx={{
                                    borderRadius: '100px',
                                    backgroundColor: index === 0 ? primary90: "white",
                                    width:'93px',
                                }}>
                                    <ListItemIcon sx={{
                                        width:'20px',
                                        height:'20px',
                                    }}>
                                        {index === 0 ? < CheckCircleOutline sx={{color:'primary.main'}}/> : <Circle sx={{color:primary90}}/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}   sx={{
                                        ml:'-20px',
                                        color:'black',
                                    }}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
            </Box>
            <Box sx={{ width: '100%', border: '2px solid #000',}}>
                <List sx={{
                    mt:"81px",
                    ml:"85px",
                    width:'auto',
                    height:'auto',
                    gap:'12px',
                }}>
                    <ListItem disablePadding>
                        <LinearProgress sx={{
                            width:'869px',
                            height:'4px',
                        }}/>
                    </ListItem>
                    <ListItem disablePadding>
                        <Typography variant="h5" sx={{color:'#926F63',
                            width:'206px',
                            height:'36px'
                        }}>
                            Customize Form
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                        <Typography variant="h6" sx={{

                        }}>
                            Create the question you want to ask
                        </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                        <Stack direction="row">
                            <IconButton >
                                <SearchIcon />
                            </IconButton>
                            <input type="text" variant="outlined"/>
                            <Typography sx={{backgroundColor:'gray',color:"blue"}}>searchbox</Typography>
                            <button type="submit" > </button>

                        </Stack>
                    </ListItem>
                </List>

            </Box>
        </Box>
    );
}