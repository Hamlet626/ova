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
import { getClinic } from "@/utils/clinic_check";
import { useUrl } from 'nextjs-current-url';
import { useSearchParams } from 'next/navigation'
import { useFormControl, TextField, FormHelperText} from '@mui/material';



const flexContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
function NameInputs_Clinic(){
return (
<Input
        name="Company Name"
        fullWidth
        startAdornment={
                <InputAdornment position="start">
                   <BusinessOutlinedIcon/>
                </InputAdornment>
                  }
        placeholder="Company Name"
        type="text"
      />
      );
      }

function NameInputs_NotClinic() {
  return (
    <Box sx={flexContainerStyle}>
      <Input
        name="firstname"
        fullWidth
        startAdornment={<InputAdornment position="start"></InputAdornment>}
        placeholder="First Name"
        type="text"
      />

      <Box width={23} />
      <Input
        name="lastname"
        fullWidth
        startAdornment={<InputAdornment position="start"></InputAdornment>}
        placeholder="Last Name"
        type="text"
      />
    </Box>
  );
}


export function SignUp1(){
    const hostName=useUrl()?.host;
    const clinic = getClinic(hostName);
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
const emailFormControl = useFormControl();
  const passwordFormControl = useFormControl();

 const [formData, setFormData] = useState({
     email: '',
     password: '',
   });

   const [errors, setErrors] = useState({
     email: '',
     password: '',
   });

   const validateEmail = (email) => {
     // Implement your email validation logic here
     if (!email || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
       return 'Invalid email address';
     }
     return '';
   };

   const validatePassword = (password) => {
     // Implement your password validation logic here
     if (!password || password.length < 6) {
       return 'Password must be at least 6 characters';
     }
       if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
             return 'Password must have 1 lowercase and 1 uppercase character';
          }

     return '';
   };

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });

     // Perform validation on the field being updated
     if (name === 'email') {
       setErrors({ ...errors, email: validateEmail(value) });
     } else if (name === 'password') {
       setErrors({ ...errors, password: validatePassword(value) });
     }
   };

   const handleSubmit = (e) => {
     e.preventDefault();

     // Check if there are any errors before submitting
     if (validateEmail(formData.email) || validatePassword(formData.password)) {
       // Handle validation errors here
       return;
     }

     // Form submission logic
     console.log('Form submitted with email:', formData.email, 'and password:', formData.password);
   };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);

    //const role = 'null';
    const clickPwIcon = () => {
        setShowPw((show) => !show);
    };

    const signup = () => {
        createUserWithEmailAndPassword(cliAuth , email, password);
    };


    return (
        <Box maxWidth="400px" >

        <Typography variant="h4" sx={font2}>
        <span sx={font2}>
          {clinic !== null ? 'Clinics Sign Up' : (role === 'ed' ? 'Egg Donor Sign Up' : 'Recipient Sign Up')}
        </span>
        </Typography>
             <Box height={50} />
          {clinic !== null ? <NameInputs_Clinic /> : <NameInputs_NotClinic />}

        <Box height={41} />
         <form onSubmit={handleSubmit}>
             <Input
               fullWidth
               placeholder="Email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               error={!!errors.email}
                startAdornment={
                                     <InputAdornment position="start">
                                        <Mail/>
                                     </InputAdornment>
                                       }
             />
             {errors.email && (
               <FormHelperText error>{errors.email}</FormHelperText>
             )}

          <Box height={16}/>

             <Input
               fullWidth

               name="password"
              // type="password"
               value={formData.password}
               onChange={handleInputChange}
               error={!!errors.password}
                startAdornment={
                     <InputAdornment position="start">
                        <Lock/>
                      </InputAdornment>}
                     endAdornment={
                     <InputAdornment onClick={clickPwIcon} >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                     </InputAdornment>}
                      placeholder="Password"
                      type={showPw?"text":"password"}

             />
             {errors.password && (
               <FormHelperText error>{errors.password}</FormHelperText>
             )}


     {/*  <Input  id="email"
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
*/}

          <Box height={40}/>
        <Link href={(!email || !password || !/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password))  ? null : "/profile"}>
          <Button type="submit"
            disabled={(!email || !password ) }
              onClick={async () => {
                const r = await fetch('/api/onboard', {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: 'lwj11304@gmail.com',
                    name: 'Test',
                    role: 0,
                    password: '123456',
                  }),
                });

                console.log(await r.json());

                if (r.status === 200) {
                  const rr = await signIn('credentials', {
                    redirect: false,
                    callbackUrl: '/',
                    email: 'lwj11304@gmail.com',
                    password: '123456',
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
 </form>
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









