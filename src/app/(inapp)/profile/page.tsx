import React from "react";
import { Box,  Typography, LinearProgress,} from "@mui/material";
import { Bg2 } from "@/components/background/bg2";


//get role
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Uploadprofile from "@/components/signup_image";



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