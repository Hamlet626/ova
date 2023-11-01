'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {Box,  Button,  FormHelperText, Input, InputAdornment, Link,  Typography} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Bg1 } from "@/components/background/bg1";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import {font2} from "@/components/ThemeRegistry/theme_consts";
//get role
import { useSearchParams } from 'next/navigation'
import { RoleNum, roles } from "@/utils/roles";

import {useForm,  useFormState} from 'react-hook-form';
import {signIn} from "next-auth/react";
import { getCliId_Client } from "@/utils/clinic_id/client";




const flexContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};


function Name_Clinic({ register, errors, trigger}){
  return (
  <Box>
          <Input
            {...register("companyName", {
              required: "companyName is required",
            })}
            fullWidth
           startAdornment={
          <InputAdornment position="start">
            <BusinessOutlinedIcon />
           </InputAdornment>
           }
            placeholder="companyName"
            type="text"
            onBlur={() => trigger("companyName")}
          />
          {errors.companyName && (
            <FormHelperText error>{errors.companyName.message}</FormHelperText>
          )}
        </Box>


  );
}

export function Name_NotClinic({ register,errors, trigger }) {
  return (
    <Box sx={flexContainerStyle}>
      <Box>
        <Input
          {...register("firstName", {
            required: "First name is required",
          })}
          fullWidth
          placeholder="First Name"
          type="text"
          onBlur={() => trigger("firstName")}
        />
        {errors.firstName && (
          <FormHelperText error>{errors.firstName.message}</FormHelperText>
        )}
      </Box>

      <Box width={23} />

      <Box>
        <Input
          {...register("lastName", {
            required: "Last name is required",
          })}
          fullWidth
          placeholder="Last Name"
          type="text"
          onBlur={() => trigger("lastName")}
        />
        {errors.lastName && (
          <FormHelperText error>{errors.lastName.message}</FormHelperText>
        )}
      </Box>
    </Box>
  );
}

export function SignUp1(){
    const clinic = getCliId_Client();
    const searchParams = useSearchParams();
const role = clinic == null ? 2 : RoleNum[searchParams.get('role')];
const router = useRouter();
 const mouseDownPwIcon = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const [showPw, setShowPw] = useState(false);
    const clickPwIcon = () => { setShowPw((show) => !show); };
    const {  register, control, formState: { errors }, trigger,getValues  } = useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);

 const handleNextButtonClick = async () => {
   setFormSubmitted(true);
   const isValid = await trigger();

   if (isValid) {
     const emailValue = getValues('email');
     const passwordValue = getValues('password');
     const nameValue=clinic == null ?getValues('companyName'):getValues('lastName');


     const r = await fetch('/api/signup', {
       method: 'POST',
       mode: 'cors',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email: emailValue,
         name: nameValue,
         role: role,
         password: passwordValue,
       }),
     });


     if (r.status === 200) {
       const rr = await signIn('credentials', {
         redirect: false,
         callbackUrl: '/',
         email: emailValue,
         password: passwordValue,
       });


      router.push('/profile');



     }
   }
 };

   const validatePassword = (password) => {
     return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
   };

    return (
        <Box maxWidth="400px" >

        <Typography  sx={font2}>
          {clinic == null ? 'Clinics Sign Up' : (role == 0 ? 'Egg Donor Sign Up' : 'Recipient Sign Up')}
        </Typography>

         <Box height={50} />

    <form >
        {clinic == null ? <Name_Clinic register={register} errors={errors} trigger={trigger} />
          : <Name_NotClinic register={register} errors={errors} trigger={trigger}  />}
         <Box height={41} />
           <Input
             {...register('email', {
               required: 'Email is required',
               pattern: {
                 value: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/,
                 message: 'Invalid email address',
               },
             })}
             fullWidth
             startAdornment={
               <InputAdornment position="start">
                 <Mail />
               </InputAdornment>
             }
             placeholder="Email"
             type="email"
             onBlur={() => trigger("email")}

           />
           {errors.email && (
             <FormHelperText error>{errors.email.message}</FormHelperText>
           )}


             <Box height={16}/>

             <Box>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                validatePassword(value) ||
                "Password must contain one lowercase letter and one uppercase letter",
            })}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" onClick={clickPwIcon} onMouseDown={mouseDownPwIcon}>
                {showPw ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            }
            placeholder="Password"
            type={showPw ? "text" : "password"}
            onBlur={() => trigger("password")}
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </Box>
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

             <Box sx={{ maxHeight: '100%',  }} >
            < SignUp1/>
             </Box>

            </Box>
            </Bg1>
);
}







