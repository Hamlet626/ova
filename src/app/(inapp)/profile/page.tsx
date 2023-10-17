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

export function c2(){
return (
<Typography variant="subtitle2" sx={{ mr: 2 }}>
            Do it later
          </Typography>
);
}

export async function  Signup_profile() {
    const user=(await getServerSession(authOptions))!.user!;
    const clinic=user?.agencies?.[0];
    const myRole=user.role!;



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
<Uploadprofile clinic={clinic} role={myRole}
c1={<Typography variant="subtitle2" sx={{ mr: 2 }}>Do it later</Typography>} />


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