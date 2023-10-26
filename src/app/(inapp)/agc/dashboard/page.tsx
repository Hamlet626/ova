'use client'
// import {signOut, useSession} from "next-auth/react";
// import {getServerSession} from "next-auth/next";
// import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import React, { useState } from 'react';
// import {styled} from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from "@/assets/ova_logo.svg";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import ToolBar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Box, Button, Menu, MenuItem, InputBase, Paper, Typography, Divider} from "@mui/material";
import {
    font10,
    font11,
    font12,
    font3,
    font4,
    font9,
    neutral_white,
    search_color
} from "@/components/ThemeRegistry/theme_consts";
import Grid2 from "@mui/material/Unstable_Grid2";

const pages = ['Home','Egg Donor','Recipients','Cases','Events']

export default async function Home() {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleTabChange = (e, tabIndex) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    const [anchorEl, setAnchorEl] = React.useState(null); // | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <AppBar sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid #D8C2BB',
            }}
                    // set to static because removing it will make the AppBar inherit its default behavior from the styling library
                    elevation={0} position="static">
                <Container maxWidth="xl">
                    <ToolBar disableGutters>
                        <Image src={logo} alt="Logo" style={{
                            width: '85px',
                            height: '27.71px',
                            marginLeft: '16px'
                            // position: 'static',
                        // top: '27px',
                        // left: '80px',
                        }}/>
                        <Box width={108}/>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <React.Fragment>
                                <Tabs value={currentTabIndex} onChange={handleTabChange}>
                                    <Tab sx={{font4, textTransform: 'none'}} label='Home' />
                                    <Tab sx={{font4, textTransform: 'none'}} label='Egg Donor' />
                                    <Tab sx={{font4, textTransform: 'none'}} label='Recipients' />
                                    <Tab sx={{font4, textTransform: 'none'}} label='Cases' />
                                    <Tab sx={{font4, textTransform: 'none'}} label='Events' />
                                </Tabs>
                            </React.Fragment>
                        </Box>
                        <IconButton color={'primary'} sx={{
                            position: 'static',
                        }}>
                            <Badge badgeContent={4} color="error">
                                <CalendarTodayIcon/>
                            </Badge>
                        </IconButton>
                        <Box width={12}/>
                        <IconButton color={'primary'} sx={{
                            position: 'static',
                            // color: '#F98F64'
                        }}>
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <Box width={12}/>
                        <IconButton color={'primary'} sx={{
                            position: 'static',
                        }}>
                            <AccountCircle/>
                        </IconButton>
                        <Box width={40}/>
                    </ToolBar>
                </Container>
            </AppBar>
            <Grid2 container spacing={3}>
                {/* shows medium-sized screens that span 2 columns */}
                {/* sets left margin to 5 units */}
                {/* grid2 component will use flexbox layout for child elements */}
                <Grid2 md={1.5} ml={5} display="flex">
                    <Box maxWidth="400px">
                        <Box height={21}/>
                        <Typography sx={font3}>Hello, Jane</Typography>
                        <Typography sx={font9}>Helios Clinic</Typography>
                    </Box>
                </Grid2>
                <Grid2>
                    <Box height={21}/>
                    <Paper component="form" elevation={0} sx={{
                        pt: '1.5',
                        pl: '5',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '28px',
                        backgroundColor: neutral_white,
                        height: '56px'
                    }}>
                        <Button
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{textTransform: 'none', color: search_color, width: '232px', marginLeft: '20px', justifyContent: 'flex-start'}}
                        >
                            Egg Donor
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <IconButton type="submit" sx={{ p: '10px' }}>
                            <SearchIcon color={'primary'}/>
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                            sx={{ ml: 2, flex: 1, margin: "auto", borderRadius: '28px', width: '855px' }}
                        />
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={3}>
                <Grid2 md={1.5} ml={5} display="flex">
                    <Box sx={{
                        width: '179px',
                        height: '269px',
                        borderRadius: '16px',
                        border: '1px solid #D8C2BB',
                    }}>
                        <Box ml='18px'>
                            <Box height='20px'/>
                            <Typography sx={font10}>Total</Typography>
                        </Box>
                        <Box ml='18px'>
                            <Box height='16px'/>
                            <Box display={'flex'}>
                                <Typography sx={font11} color={'primary'}>456</Typography>
                                <Box width='56px'/>
                                <IconButton type="submit" sx={{ p: '10px' }}>
                                    <ArrowForwardIcon sx={{color: search_color}}/>
                                </IconButton>
                            </Box>
                            <Typography sx={font12}>Egg Donors</Typography>
                            <Box height='16px'/>
                            <Box>
                                <Typography sx={font11} color={'primary'}>1,436</Typography>
                                <Typography sx={font12}>Recipients</Typography>
                            </Box>
                            <Box height='16px'/>
                            <Box>
                                <Typography sx={font11} color={'primary'}>203</Typography>
                                <Typography sx={font12}>Cases</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Grid2>
                <Grid2>
                    <Box sx={{
                        width: '744px',
                        height: '269px',
                        borderRadius: '16px',
                        border: '1px solid #D8C2BB',
                    }}>

                    </Box>
                </Grid2>
            </Grid2>
        </Box>
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        //   <Signin/>
        // </main>
        //   <div className="p-8">
        //     {/*<div>{session?.data?.user?.email }</div>*/}
        //       <div>{JSON.stringify(session) }</div>
        //     {/*<button onClick={() => {signOut()}}>Logout</button>*/}
        //   </div>
    )
}
