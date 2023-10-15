import React from "react";
import {Card, Paper, Box, Container, Input, Button, Typography, LinearProgress,
     Breadcrumbs,  InputAdornment, Link, Stack, TextField, CardMedia
} from "@mui/material";
import { Bg2 } from "@/components/background/bg2";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";
//icons
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

//import grid
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CardContent from "@mui/material/CardContent";

import { getClinic } from "@/utils/clinic_check";
import { useUrl } from 'nextjs-current-url';
import { useSearchParams } from 'next/navigation';
import {useSession} from "next-auth/react";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Uploadprofile from "@/components/signup_image";


export  async function  Signup_profile() {
//     const user=(await getServerSession(authOptions))!.user!;
//     console.log(user);
//     const myRole=user.role!;// //    const session = await getServerSession(authOptions);
//
//      if (session) {
//        // Access user-related data from the session
//        const user = session.user;
//        const clinic = user?.agencies?.[0] || null; // Assuming the clinic is in the first position.
//
//        // Log the session and clinic information
//        console.log('Session:', session);
//        console.log('Clinic:', clinic);
//
//        // Now you can use the 'user' or 'clinic' data in your component.
//      } else {
//        // Handle the case when there's no active session
//      }
  const clinic = null ;

  return (
  <Box minWidth='400px'>
         <Box sx={{ display: "flex",  justifyContent: 'center',   alignItems: 'center',}}>
               <Typography variant="h4" sx={{whiteSpace: 'nowrap',marginTop: 0 }}>
                 Sign Up
               </Typography>
          <Box width={191} />
      <LinearProgress variant="determinate" value={66.67} color="primary" sx={{ width: '700px', maxWidth: '100%',backgroundColor: "grey",  }} />
            <Box width={38}/>
              <Typography color="primary"> 50 </Typography>
               <Typography > /100% </Typography>
                   </Box>
<Box height={50}/>
<Uploadprofile clinic={clinic} />

    <Box height={200}/>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2" sx={{ mr: 2 }}>
            Do it later
          </Typography>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            sx={{
              typography: 'label1',
              color: 'white',
              width: '193px',
            }}
          >
            Next
          </Button>
        </Box>
</Box>

          );
        }



export default function SignUp2() {
  return (
  <Bg2>
               <Box sx={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: '100vh',
                 overflowY: 'auto',
                }}>
             <Box sx={{ maxHeight: '100%',  }} >

              < Signup_profile />
</Box>
              </Box>
              </Bg2>

  );
}