//'use client'
import {signOut, useSession} from "next-auth/react";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import logo from "@/assets/ova_logo.svg";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import ToolBar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from "next/image";
import {Box, Button, Typography} from "@mui/material";
import {font2, font3} from "@/components/ThemeRegistry/theme_consts";
import Grid2 from "@mui/material/Unstable_Grid2";

const pages = ['Home','Egg Donor','Recipients','Cases','Events']
export default async function Home() {
    // const session = useSession({
    //   required: true,
    //   onUnauthenticated() {
    //     redirect('/signin');
    //   },
    // });

    const session=await getServerSession(authOptions);

    return (
        <Box>
            <AppBar sx={{ backgroundColor: '#FFFFFF' }} position="static">
            {/*        style={{*/}
            {/*    width: '1474px',*/}
            {/*    height: '78px',*/}
            {/*}}>*/}
                <Container maxWidth="xl">
                    <ToolBar disableGutters>
                        <Image src={logo} alt="Logo" style={{
                            width: '85px',
                            height: '27.71px',
                            position: 'static',
                        // top: '27px',
                        // left: '80px',
                        }}/>
                        <Box width={108}/>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{my: 2, mr: 3, color: '#85736D', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <IconButton sx={{
                            height: '48px',
                            width: '48px',
                            position: 'static',
                            color: '#F98F64'
                        }}>
                            <Badge badgeContent={4} color="error">
                                <CalendarTodayIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton sx={{
                            height: '48px',
                            width: '48px',
                            position: 'static',
                            color: '#F98F64'
                        }}>
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton sx={{
                            height: '48px',
                            width: '48px',
                            position: 'static',
                            color: '#F98F64'
                        }}>
                            <AccountCircle/>
                        </IconButton>
                    </ToolBar>
                </Container>
            </AppBar>
            <Grid2 container spacing={3} height='145px'>
                <Grid2 md={2} display="flex" justifyContent="center" alignItems="center">
                    <Box maxWidth="400px">
                        <Typography sx={font2}>Hello, Jane</Typography>
                        <IconButton sx={{
                            height: '17.42px',
                            width: '14.25px',
                            top: '2.38px',
                            left: '5px',
                            color: '#F98F64'
                        }}>
                            <HomeWorkIcon/>
                        </IconButton>
                        <Typography sx={font3}>Helios Clinic</Typography>
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
