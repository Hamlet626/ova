'use client';
import React from "react";
import {Paper, Box, Container, Input, Button, Typography, LinearProgress,
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

//import grid
import Grid from '@mui/material/Grid';

export function Signup_profile1() {
//state that when user select file
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState('');
  const [fileName, setFileName] = useState('');

//when click upload button
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size)); // Format file size for display
    }
  };

  // Function to format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return 'No file select';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
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
      <LinearProgress variant="determinate" value={66.67} sx={{ width: '700px',maxWidth: 'calc(100% - 100px)',  backgroundColor: "grey", "& .MuiLinearProgress-bar": { backgroundColor: "orange" } }} />
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
       <Paper elevation={3} sx={{ padding: 3, maxWidth: '400px' }}>
                <Typography variant="h6">
                             Upload Egg Donor's Photo
                              </Typography>
     {/* Display file name and size */}
            {selectedFile && (
              <div>
                <Typography variant="body1"> {fileName}</Typography>
                <Typography variant="body1"> {fileSize}</Typography>
              </div>
            )}

                 <Button variant="contained" size="large" sx={{ marginTop: 2 }}>
                               <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
                                 Browse Photos
                               </label>
                               <input
                                 type="file"
                                 accept="image/*"
                                 id="file-upload"
                                 style={{ display: 'none' }}
                                 onChange={handleFileChange}
                               />
                             </Button>


                </Paper>
              </Box>
            </Box>
                </>

          );
        }

export default function Signup_profile() {
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
      {/* Use Bg2 component as the background */}
      <Bg2 />

      {/* Center the SignUpProfile1 component */}
      <Signup_profile1 />
    </Grid>
  );
}