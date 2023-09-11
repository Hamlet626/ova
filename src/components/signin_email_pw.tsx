'use client'
///todo: try make it a server component,
/// by https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations

import {//Button, Input,
    Box, Breadcrumbs, Button, Container, Input, InputAdornment, Link, Stack, TextField, Typography, useFormControl
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form";
import NextLink from "next/link";
import { RoleNum, roles } from "@/utils/roles";


export default function SigninEmailPwBlock() {
    const [showPw,setShowPw]=useState(false);
    const [signingIn,setSigningIn]=useState(false);
    const {register, handleSubmit, formState: { errors }}=useForm();
    const router = useRouter();
    const clickPwIcon = () => setShowPw((show) => !show);

    const mouseDownPwIcon = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const login=handleSubmit(async(data)=>{
        setSigningIn(true);
        const r=await signIn('credentials', {email:data.email, password:data.password, redirect: false, callbackUrl: '/'});
        if(r?.ok){
            const session=await getSession();
            const rolePath=session?.user?.role===RoleNum.ED?"ed":
            session?.user?.role===RoleNum.Rcp?"rcp":"agc";
            router.push(`/dashboard`);
            return;
        }
        console.log(r);
        setSigningIn(false);
    });

    return(
        // <Stack direction="column" justifyContent="center" alignItems="flex-start" maxWidth="400px">
        <>
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
            <LoadingButton loading={signingIn}
                onClick={login}
                // disabled={!email || !password}
                fullWidth variant="contained" size="large" startIcon={<Login/>}>
                Log in
            </LoadingButton>
            <Box height={96}/>
            <Button disabled={signingIn} color="secondary"
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
        </>
    )
}