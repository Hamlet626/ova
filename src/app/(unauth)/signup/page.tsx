'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";
import {//Button, Input,
    Box, Breadcrumbs, Button, Container, Input, InputAdornment, Link, Stack, TextField, Typography
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Bg1 } from "@/components/background/bg1";
import { Bg2 } from "@/components/background/bg2";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";

//import grid
import Grid from '@mui/material/Grid';

//"Sign Up" in signup page

const signUpTextStyle = {
  textAlign: 'center',
  marginBottom: '16px', // Adjust the margin as needed
};

const flexContainerStyle = {
  display: "flex",
  flexDirection: "row", // Horizontal arrangement
  justifyContent: "space-between", // Spacing between First Name and Last Name
};

export function SignUp1(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [showPw, setShowPw] = useState(false);
      const router = useRouter();

      const navigateToSignupProfile = () => {
        // 使用 router.push 来进行导航，包括 "(inapp)" 在路径中
        router.push('/app/(inapp)/signupprofile');
      };

    // Function to toggle password visibility
    const clickPwIcon = () => {
        setShowPw((show) => !show);
    };
    const mouseDownPwIcon = (event) => {
              event.preventDefault();
          };

    const signup = () => {
        createUserWithEmailAndPassword(cliAuth , email, password);
    };
    return (
          //  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
           // {/*16 px as one unit, the space between two input email&password  */}
        <Box maxWidth="400px" >
        <Typography variant="h4" sx={font2 } >Sign Up</Typography>
             <Box height={50} />
<Box sx={flexContainerStyle}>
        <Input
          name="firstname"
          fullWidth
          startAdornment={
            <InputAdornment position="start"></InputAdornment>
          }
          placeholder="First Name"
          type="text"

        />
    {/*  {/* 2.5 unit */}
        <Box width={23} />

        <Input
          name="lastname"
          fullWidth
          startAdornment={
            <InputAdornment position="start"></InputAdornment>
          }
          placeholder="Last Name"
          type="text"
        />
      </Box>
     {/* 2.5 unit, same as the space betwwen signup and name */}
      <Box height={41} />
       <Input  id="email"
               name="email"
               type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
                 required
         fullWidth startAdornment={
                      <InputAdornment position="start">
                          <Mail/>
                      </InputAdornment>

                  } placeholder="Email" type="email"/>
                    <Box height={16}/>
                              <Input  id="password"
                                     name="password"
                                       type="password"
                                        autoComplete="current-password"
                                       onChange={(e) => setPassword(e.target.value)}
                                        required fullWidth startAdornment={
                                  <InputAdornment position="start">
                                      <Lock/>
                                  </InputAdornment>}
                                     endAdornment={
                                  <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                                      {showPw ? <VisibilityOff /> : <Visibility />}
                                  </InputAdornment>}
                                     placeholder="Password" type={showPw?"text":"password"}/>
          {/*
            <Box height={16}/>
            <Input  input
                         id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                    autoComplete="current-password"
                onChange={(e) => setPasswordAgain(e.target.value)}
                required fullWidth startAdornment={
                          <InputAdornment position="start">
                                <Lock/>
                          </InputAdornment>}
                              endAdornment={
                     <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                     {showPw ? <VisibilityOff /> : <Visibility />}
                     </InputAdornment>}
                     placeholder="Password Again" type={showPw?"text":"password"}/>

  <Box height={40}/>
<Link href={(!email || !password || !passwordAgain) || (password !== passwordAgain) ? null : "/(inapp)/signup_profile"}>
  <Button
    disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
    onClick={() => signup()}
    fullWidth
    variant="contained"
    size="large"
    startIcon={<ArrowCircleRightOutlinedIcon />}
  >
    Next
  </Button>
</Link> */}
 {/* make password condition here*/}
  <Box height={40}/>

<Link href={(!email || !password || password.length < 6)  ? null : "/signup1"}>
  <Button
    disabled={(!email || !password || password.length < 6 ) }
    onClick={() => signup()}
    fullWidth
    variant="contained"
    size="large"
    startIcon={<ArrowCircleRightOutlinedIcon />}
  >
    Next
  </Button>
</Link>

      {/*4 unit from next to login, and Login text take 1 unit, so 1.5 unit for each*/}
 <Box height={33}/>
             <Typography variant="h6" sx={signUpTextStyle}>Log In</Typography>
            <Box height={37}/>

            <Button fullWidth variant="outlined" size="large" startIcon={<Google/>}>Google Log in</Button>
    <Box height={30}/>
 </Box>

    )
}
export default function SignUp() {
  return (
  //md is medium size with 12 cols

    <Grid  md={12}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      Height="100vh"
    >
      {/* Use Bg1 component as the background */}
         <Bg1/>

      {/* Center the SignUpBlock */}
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        Height="100vh"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
//           marginLeft: '100px', // Adjust this value as needed
        }}
      >
      <Grid item>
                      <Grid  container
                          style={{
                                   maxHeight: '100vh',
                              }}
                            >
                     <Container maxWidth="sm" style={{ overflowY: 'hidden' }}>
                        <SignUp1 />
                         </Container>

                    </Grid>
                  </Grid>
             </Grid>
           </Grid>
         );

}









