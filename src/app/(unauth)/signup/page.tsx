'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { cliAuth  } from "@/utils/firebase/firebase_client";
import {Box,  Button, Container, Input, InputAdornment, Link,  Typography} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Bg1 } from "@/components/background/bg1";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";
//import {flexContainerStyle, NameInputs_NotClinic,NameInputs_Clinic} from "@/components/signup/signup_page.ts";

import { getClinic } from "@/utils/clinic_check";
import { useUrl } from 'nextjs-current-url';
import { useSearchParams } from 'next/navigation'
import {   InputLabel,FormControl,useFormControl, TextField, FormHelperText} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {useForm, Controller, useFormState} from 'react-hook-form';
import {signIn} from "next-auth/react";
// import SigninBlock from "@/app/(unauth)/signin/signin_block";




const flexContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};


function Name_Clinic({control, errors, trigger}){
  return (
  <Box >
      <Controller
             name="companyName"
             control={control}
             rules={{
               required: "companyName is required",
             }}
             render={({ field }) => (
               <Box>
                 <Input
                   {...field}
                   fullWidth
                   startAdornment={
                  <InputAdornment position="start">
                   <BusinessOutlinedIcon />
                    </InputAdornment>
                 }
                   placeholder="Company Name"
                   type="text"
                   onBlur={()=> trigger('companyName')}
                 />
                {errors.companyName && <FormHelperText error>{errors.companyName.message}</FormHelperText>}
                </Box>
        )}
            />
  </Box>
  );
}

export function Name_NotClinic({ control, errors, trigger }) {
  return (
     <Box sx={flexContainerStyle}>
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: "First name is required",
        }}
        render={({ field }) => (
          <Box>
            <Input
              {...field}
              fullWidth
              placeholder="First Name"
              type="text"
              onBlur={()=> trigger('firstName')}
            />
            {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
          </Box>
        )}
      />

      <Box width={23} />

      <Controller
        name="lastName"
        control={control}
        rules={{
          required: "Last name is required",
        }}
        render={({ field }) => (
          <Box>
            <Input
              {...field}
              fullWidth
              placeholder="Last Name"
              type="text"
              onBlur={()=> trigger('lastName')}
            />
            {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
          </Box>
        )}
      />
    </Box>
  );
}


export function SignUp1(){
    const hostName=useUrl()?.host;
    const clinic = getClinic(hostName);
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const router = useRouter();


 const mouseDownPwIcon = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const [showPw, setShowPw] = useState(false);
    const clickPwIcon = () => { setShowPw((show) => !show); };
    const {  control, formState: { errors }, trigger,getValues  } = useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);

 const handleNextButtonClick = async () => {
   setFormSubmitted(true);
   const isValid = await trigger();

   if (isValid) {
    router.push('/profile');
     const emailValue = getValues('email');
     const passwordValue = getValues('password');

     const r = await fetch('/api/signup', {
       method: 'POST',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email: emailValue,
         name: 'Test',
         role: 0,
         password: passwordValue,
       }),
     });

     console.log(await r.json());

     if (r.status === 200) {
       const rr = await signIn('credentials', {
         redirect: false,
         callbackUrl: '/',
         email: emailValue,
         password: passwordValue,
       });

       console.log(rr);



     }
   }
 };

   const validatePassword = (password) => {
     return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
   };

    return (
        <Box maxWidth="400px" >

        <Typography  sx={font2}>
          {clinic !== null ? 'Clinics Sign Up' : (role === 'ed' ? 'Egg Donor Sign Up' : 'Recipient Sign Up')}
        </Typography>

         <Box height={50} />

    <form >
        {clinic !== null ? <Name_Clinic control={control} errors={errors} trigger={trigger} />
          : <Name_NotClinic control={control} errors={errors} trigger={trigger}  />}
         <Box height={41} />

            <Controller
             name="email"
             control={control}
             rules={{
               required: "Email is required",
               pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address",
               },
             }}
             render={({ field }) => (
               <Box>
                 <Input
                   {...field}
                   fullWidth
                   startAdornment={
                     <InputAdornment position="start">
                       <Mail />
                     </InputAdornment>
                   }
                   placeholder="Email"
                   type="email"
                   onBlur={()=> trigger('email')}
                 />
        {errors.email && ( <FormHelperText error>{errors.email.message}</FormHelperText> )}
           </Box>
             )}
           />

             <Box height={16}/>

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                validatePassword(value) ||
                "Password must contain one lowercase letter and one uppercase letter",
            }}
            render={({ field }) => (
              <Box>
                <Input
                  {...field}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                      {showPw ? <VisibilityOff/> : <Visibility />}
                    </InputAdornment>
                  }
                  placeholder="Password"
                  type={showPw ? "text" : "password"}
                  onBlur={()=> trigger('password')}
                />
                {errors.password && ( <FormHelperText error>{errors.password.message}</FormHelperText> )}
              </Box>
                 )}
               />
       </form>

          <Box height={40}/>

          <Button type="submit"
            onClick={handleNextButtonClick}
            fullWidth
            variant="contained"
            size="large"
            sx={{color:'white'}}
            startIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Next
          </Button>

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

             <Box sx={{ maxHeight: '100vh',  }} >
            < SignUp1/>
             </Box>

            </Box>
            </Bg1>
);
}







