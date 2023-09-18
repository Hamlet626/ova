'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";
import {Box,  Button, Container, Input, InputAdornment, Link,  Typography} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Bg1 } from "@/components/background/bg1";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";


const flexContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export function SignUp1(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    const clickPwIcon = () => {
        setShowPw((show) => !show);
    };

    const signup = () => {
        createUserWithEmailAndPassword(cliAuth , email, password);
    };


    return (
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

        <Box height={41} />
        <Input  id="email"
               name="email"
               type="email"
               autoComplete="email"
               onChange={(e) => setEmail(e.target.value)}
               required
               fullWidth
               startAdornment={
                <InputAdornment position="start">
                   <Mail/>
                </InputAdornment>
                  }
                placeholder="Email"
                type="email"/>

          <Box height={16}/>
           <Input  id="password"
                   name="password"
                   type="password"
                   autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required fullWidth
                    startAdornment={
                    <InputAdornment position="start">
                       <Lock/>
                     </InputAdornment>}
                    endAdornment={
                    <InputAdornment onClick={clickPwIcon} >
                     {showPw ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>}
                     placeholder="Password"
                     type={showPw?"text":"password"}/>


          <Box height={40}/>
        <Link href={(!email || !password || !/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password))  ? null : "/(inapp)/rcp/signup_profile"}>
          <Button
            disabled={(!email || !password || !/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) }
            onClick={() => signup()}
            fullWidth
            variant="contained"
            size="large"
            sx={{color:'white', textTransform:'none'}}
            startIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Next
          </Button>
        </Link>

         <Box height={33}/>
          <Typography variant="h6" sx={{textAlign: 'center'}}>Log In</Typography>
            <Box height={37}/>
            <Button fullWidth variant="outlined" size="large" startIcon={<Google/>}>Google Log in</Button>
          <Box height={30}/>
  </Box>
    )
}
export default function SignUp() {
  return (
            <Bg1>
           <Box sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '100vh',
               overflowY: 'auto',
             }}>
             <Box
                   sx={{
                     maxHeight: '100vh', // Adjust the maxHeight as needed
                   }}
                 >
            < SignUp1/>
             </Box>
            </Box>
            </Bg1>
);
}









