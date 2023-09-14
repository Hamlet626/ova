'use client'
import { useEffect } from 'react'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/system/Stack';
import {createTheme, ThemeProvider, Typography} from "@mui/material";
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

export default function customize_Form() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{
                width: '297px',
                height:'941px',
                backgroundColor: 'white',
                mt:'-25px',
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
                    mt:'62px',
                    ml:'80px',
                    width:'133px',
                    height:'32px'
                }}>
                    Create Form
                </Typography>
                <List sx={{
                    mt:"16px",
                    ml:"80px",
                    width:'193px',
                }}>
                    {['Basic Information', 'Family & Others', 'Personal Medical', 'Other A', 'Other B'].map((text, index) => (
                        <div key={text}>
                            <ListItem key={text} disablePadding>
                                <ListItemButton sx={{
                                    borderRadius: '24px',
                                    backgroundColor: index === 0 ? "primary.main": "white"
                                }}>
                                    <ListItemIcon>
                                        {index === 0 ? < CheckCircleOutline sx={{color:'primary.main'}}/> : <Circle sx={{color:primary90}}/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{
                    width:'869px',
                    height:'4px',
                    mt:'81px',
                    ml:'85px'
                }}/>
                <Typography variant="h5" sx={{color:'#926F63',
                    mt:'20px',
                    ml:'85px',
                    width:'206px',
                    height:'36px'
                }}>
                    Customize Form
                </Typography>

            </Box>
        </Box>
    );
}