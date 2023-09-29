'use client';
import React from "react";
import {Card, Paper, Box, Container, Input, Button, Typography, LinearProgress,
     Breadcrumbs,  InputAdornment, Link, Stack, TextField
} from "@mui/material";
import { Bg2 } from "@/components/background/bg2";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";
//icons
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

//import grid
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export function Signup_profile1() {
//state that when user select file
  const [selectedFile, setSelectedFile] = useState(null);
    const [fileSize, setFileSize] = useState('');
    const [fileName, setFileName] = useState('');
    const [filePreview, setFilePreview] = useState(null);
 //error for above 100M
    const [fileSizeError, setFileSizeError] = useState(false);

 const handleFileChange = (event) => {
     const file = event.target.files[0];
     const formatFileSize = (bytes) => {
       if (bytes === 0) return '0 Bytes';
       const k = 1024;
       const sizes = ['Bytes', 'KB', 'MB'];
       const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
       return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
     };
      if (file) {
        if (file.size <= 100 * 1024 * 1024) {
          setSelectedFile(file);
          setFileName(file.name);
          setFileSize(formatFileSize(file.size));
          setFileSizeError(false);
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreview(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          setFileSizeError(true);
          setSelectedFile(null);
          setFileName('');
          setFileSize('');
          setFilePreview(null);
        }
      }
    };
  return (
  <>
          {/* Sign Up text and progress bar */}
          <Box maxWidth='400px'>
         <Box sx={{ position: "absolute", top: 63, left: 80, margin: "16px", display: "flex", alignItems: "center" }}>
               <Typography variant="h4">
                 Sign Up
               </Typography>
          <Box width={191}/>
      <LinearProgress variant="determinate" value={66.67} sx={{ width: '700px', backgroundColor: "grey", "& .MuiLinearProgress-bar": { backgroundColor: "orange" } }} />
            <Box width={38}/>
              <Typography className="progress-text">
                       <span style={{ color: "orange" }}>50</span>/100%
                     </Typography>
                   </Box>
<Box height={33}/>
 <Box
         sx={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
         }}
       >
          <Card variant="outlined" sx={{ padding: 3, maxWidth: '400px' , borderRadius: 0, }}>
    {/*                   <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}> */}

               {selectedFile && (
                <CardMedia
                  component="img"
                  src={URL.createObjectURL(selectedFile)} // Assuming it's an image file
                  alt="Preview"
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                   />
              )}
        <div style={{ marginLeft: '16px', flex: 1 }}>

         <Typography variant="h6" style={{ marginLeft: '30px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
           Upload Egg Donor's Photo
         </Typography>
          {selectedFile && (
           <div style={{marginBottom:"1px"}}>
           <Typography variant='body1' style={{ textDecoration: 'underline', color: '#7F7572', marginLeft: '30px' }}>{selectedFile.name}</Typography>
            <Typography variant='body1'style={{ textDecoration: 'underline', color: '#7F7572', marginLeft: '30px' }}>{formatFileSize(selectedFile.size)}</Typography>
           </div>

                        )}


            <div style={{ marginTop: '16px' }}>
                     <Button component="label" variant="contained" startIcon={<SourceOutlinedIcon />}>
                            Browse Photos
                           <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                         </Button>
             </div>

    </div>
                    </Card>

              </Box>
            </Box>
    <div
            style={{
              position: 'fixed',
              bottom: '0',
              left: '0',
              margin: '30px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button variant="outlined" >
              Cancel
            </Button>
          </div>
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
                  <Typography  variant="h6" style={{ whiteSpace: 'nowrap' }}>Do it later</Typography >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<ArrowCircleRightOutlinedIcon />}
                      style={{ marginLeft: '24px' }}

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