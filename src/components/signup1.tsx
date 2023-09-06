'use client'
import {//Button, Input,
    Box, Breadcrumbs, Button, Container, Input, InputAdornment, Link, Stack, TextField, Typography
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme";





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


export default function SignUpBlock() {
    const [showPw,setShowPw]=useState(false);

    const clickPwIcon = () => setShowPw((show) => !show);

    const mouseDownPwIcon = (event) => {
        event.preventDefault();
    };

    return(
        // <Stack direction="column" justifyContent="center" alignItems="flex-start" maxWidth="400px">
        <Box maxWidth="400px">

             <Typography variant="h4" sx={font2}>Sign Up</Typography>
            <Box height={34}/>

    {/* First Name and Last Name */}

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
        <Box width={16} />
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
      <Box height={30} />
            <Input name="email" fullWidth startAdornment={
                <InputAdornment position="start">
                    <Mail/>
                </InputAdornment>
            } placeholder="Email" type="email"/>
            <Box height={16}/>
            <Input name="password" fullWidth startAdornment={
                <InputAdornment position="start">
                    <Lock/>
                </InputAdornment>}
                   endAdornment={
                <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                    {showPw ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>}
                   placeholder="Password" type={showPw?"text":"password"}/>
            <Box height={40}/>
            <Link href="/signup1">
            <Button fullWidth variant="contained" size="large" startIcon={<ArrowCircleRightOutlinedIcon/>}>Next</Button>
             </Link>
             <Box height={20}/>
             <Typography variant="h6" sx={signUpTextStyle}>Log In</Typography>
            <Box height={16}/>
            <Button fullWidth variant="outlined" size="large" startIcon={<Google/>}>Google Log in</Button>

        </Box>
    )
        {/*</Stack>*/}

}