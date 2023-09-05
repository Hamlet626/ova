'use client'
///todo: try make it a server component,
/// by https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations

import {//Button, Input,
    Box, Breadcrumbs, Button, Container, Input, InputAdornment, Link, Stack, TextField, Typography, useFormControl
} from "@mui/material";
import {font1} from "@/components/ThemeRegistry/theme";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import { useState } from "react";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form";

export default function SigninBlock() {
    const [showPw,setShowPw]=useState(false);
    const {register, handleSubmit, formState: { errors }}=useForm();
    const router = useRouter();
    const clickPwIcon = () => setShowPw((show) => !show);

    const mouseDownPwIcon = (event) => {
        event.preventDefault();
    };

    const login=handleSubmit(async(data)=>{
        const r=await signIn('credentials', {email:data.email, password:data.password, redirect: false, callbackUrl: '/'});
        console.log(r);
    });

    return(
        // <Stack direction="column" justifyContent="center" alignItems="flex-start" maxWidth="400px">
        <Box maxWidth="400px">
            <Typography variant='h6'>Welcome to OVA,</Typography>
            <Box height={16}/>
            <Typography sx={font1}>Log In</Typography>
            <Box height={64}/>
            <form>
                <Input name="email" fullWidth startAdornment={
                    <InputAdornment position="start">
                        <Mail/>
                    </InputAdornment>
                } placeholder="Email" type="email"
                       {...register("email")}
                />
                <Box height={16}/>
                <Input name="password" fullWidth startAdornment={
                    <InputAdornment position="start">
                        <Lock/>
                    </InputAdornment>}
                       endAdornment={
                    <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                        {showPw ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>}
                       placeholder="Password" type={showPw?"text":"password"}
                       {...register("password")}
                />
            </form>
            <Box height={40}/>
            <Button
                onClick={login}
                // disabled={!email || !password}
                fullWidth variant="contained" size="large" startIcon={<Login/>}>
                Log in
            </Button>
            <Box height={96}/>
            <Button
                fullWidth variant="outlined" size="large" startIcon={<Google/>}>
                Google Log in
            </Button>
            <Box height={32}/>
            <Typography variant="body1" sx={{px:"16px"}}>
                {"Don't have an account? "}
                <Link onClick={() => router.push('signup')}
                    href="/signup" component={NextLink}>
                    Sign Up
                </Link>
            </Typography>
        </Box>
    )
        {/*</Stack>*/}

}