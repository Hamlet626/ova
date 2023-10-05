'use client';
import React from "react";
import {Card, Paper, Box, Container, Input, Button, Typography, LinearProgress,
     Breadcrumbs,  InputAdornment, Link, Stack, TextField, CardMedia
} from "@mui/material";
import { Bg2 } from "@/components/background/bg2";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
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
import { useSearchParams } from 'next/navigation'


const VisuallyHiddenInput = styled('input')({
  height: 8,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 8,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export function Signup_profile1() {
    const hostName=useUrl()?.host;
    const clinic = getClinic(hostName);
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    const [selectedFile,setSelectedFile]=useState(null);

    const handleFileChange=(event)=>{
    const file =event.target.files[0];
    if (file){
    setSelectedFile(file);
    }
    };

    const formatFileSize = (bytes) => {
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    };


  return (
  <>
          <Box maxWidth='400px'>
         <Box sx={{ position: "absolute", top: 48, left: 80,  display: "flex", alignItems: "center" }}>
               <Typography variant="h4" sx={{whiteSpace: 'nowrap'}}>
                 Sign Up
               </Typography>
          <Box width={191} />
      <LinearProgress variant="determinate" value={66.67} sx={{ width: '700px', maxWidth: '100%',backgroundColor: "grey", "& .MuiLinearProgress-bar": { backgroundColor: "orange" } }} />
            <Box width={38}/>
              <Typography className="progress-text">
                       <span style={{ color: "orange" }}>50</span>/100%
                     </Typography>
                   </Box>
<Box height={33}/>
 <Box
         sx={{
           position: "absolute",
           top: "40%",
           left: "50%",
           transform: "translate(-50%, -50%)",
         }}
       >

<Card variant="outlined" sx={{ padding: 3,  borderRadius: '10px' ,width: '600px', height: clinic !== null ? '300px' : '200px',}}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {selectedFile && (
      <CardMedia
        component="img"
        src={URL.createObjectURL(selectedFile)}
         alt="Preview"
        sx={{
          width: '160px',
          height: '160px',
          borderRadius: '100%',
        }}
      />
    )}

    <div style={{ marginLeft: '30px', flex: 1 }}>
      <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
       {clinic !== null ? 'Upload Logo' : role === 'ed' ? "Upload Egg Donor's Photo" : "Upload Recipient's Photo"}
      </Typography>
      {selectedFile && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'grey', marginTop:'16px' }}>
            {selectedFile.name}
          </Typography>

          <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'grey', marginTop:'4px' }}>
            {formatFileSize(selectedFile.size)}
          </Typography>
        </div>
      )}


  <div style={{ marginTop: '16px', flex: 1 }}>
    <Button component="label" variant="contained" startIcon={<SourceOutlinedIcon />} sx={{ typography: 'label1'}} >
      Browse Photos
      <VisuallyHiddenInput type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    </Button>
  </div>


  </div>

</div>
{clinic !== null && (
      <Input name="url" placeholder="Desired URL" variant="outlined"  type="text" sx={{ width: '100%', marginTop: '24px' }}
      startAdornment={ <InputAdornment position="start"> <LinkOutlinedIcon /></InputAdornment> }
      />
    )}
</Card>

    </Box>
    </Box>

            <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      margin: '30px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >

                  <Typography  variant="subtitle2" >Do it later</Typography >
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ArrowForwardIcon  />}
                      sx={{typography: 'label1', marginLeft: '24px', marginRight: '40px',color:'white',width:'193px'}}
                    >
                      Next
                    </Button>
                  </div>
                </>

          );
        }


export default function SignUp() {
  return (
    <Grid
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Bg2 />

      <Signup_profile1 />
    </Grid>
  );
}