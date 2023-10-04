'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
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
const options = ["Company1", "Company2","Company3"]; // Replace with your list of company names
  const [selectedCompany, setSelectedCompany] = useState('');

  return (
  <form style={{  maxWidth: "400px", borderRadius: 0,}}>

      <Controller
             name="companyName"
             control={control}
             defaultValue=""
             rules={{
               required: "companyName is required",
               minLength: {
                 value: 2,
                 message: "Invalid",
               },
             }}
             render={({ field }) => (
               <div>
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

       </div>
              )}
            />
  </form>

  );
}

export function NameInputs_Clinic({ control, errors, trigger }) {
  return (
        <Box sx={flexContainerStyle}>

      {/* First Name Input */}
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{
          required: "First name is required",
          minLength: {
            value: 2,
            message: "Invalid",
          },
        }}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              fullWidth
              placeholder="First Name"
              type="text"
              onBlur={()=> trigger('firstName')}

            />
            {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
          </div>
        )}
      />

      <Box width={23} />

      {/* Last Name Input */}
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Invalid",
          },
        }}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              fullWidth
              placeholder="Last Name"
              type="text"
              onBlur={()=> trigger('lastName')}

            />
            {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
          </div>
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

 const mouseDownPwIcon = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const [showPw, setShowPw] = useState(false);

    //const role = 'null';
    const clickPwIcon = () => {
        setShowPw((show) => !show);
    };

    const signup = () => {
        createUserWithEmailAndPassword(cliAuth , email, password);
    };

const { register, handleSubmit, control, formState: { errors }, trigger,getValues  } = useForm();


    const isButtonDisabled =
    !!errors.email ||
    !!errors.password ||
    (errors.email && errors.email.message) ||
    (errors.password && errors.password.message);

   const validatePassword = (password) => {
     return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
   };

    const handleLinkClick = (event) => {
       if (!isButtonDisabled) {
         event.preventDefault(); // Prevent navigation when the button is not disabled
       }
     };

    return (
        <Box maxWidth="400px" >

        <Typography variant="h4" sx={font2}>
        <span sx={font2}>
          {clinic !== null ? 'Clinics Sign Up' : (role === 'ed' ? 'Egg Donor Sign Up' : 'Recipient Sign Up')}
        </span>
        </Typography>

             <Box height={50} />
         <Name_Clinic control={control} errors={errors} trigger={trigger} />

{/*}      {clinic !== null ? <NameInputs_Clinic /> : <NameInputs_Clinic />}*/}
         <Box height={41} />
<form >
    <Controller
             name="email"
             control={control}
             defaultValue=""
             rules={{
               required: "Email is required",
               pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                 message: "Invalid email address",
               },
             }}
             render={({ field }) => (
               <div>
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
 {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}

           </div>
             )}
           />

             <Box height={16}/>

      <Controller
        name="password"
        control={control}
        defaultValue=""
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
          <div>
            <Input
              {...field}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end" onClick={clickPwIcon}>
                  {showPw ? <VisibilityOff/> : <Visibility />}
                </InputAdornment>
              }
              placeholder="Password"
              type={showPw ? "text" : "password"}
               onBlur={()=> trigger('password')}


            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </div>
             )}
           />

</form>
<Link href={isButtonDisabled ? undefined : '/profile'}>
          <Box height={40}/>
          <Button type="submit"
        disabled={isButtonDisabled}
              onClick={async () => {
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
              }}
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







