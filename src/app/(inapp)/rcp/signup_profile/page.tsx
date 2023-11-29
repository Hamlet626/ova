'use client';
import React from "react";
import {Card, Paper, Box, Container, Input, Button, Typography, LinearProgress,
     Breadcrumbs,  InputAdornment, Link, Stack, TextField
} from "@mui/material";
import { Bg2 } from "@/components/background/bg2";

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
//icons
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

//import grid
import Grid from '@mui/material/Grid';

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
      <Card variant="outlined" sx={{ padding: 3, maxWidth: '400px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>

                    {filePreview && (
                     <div
                       style={{
                                 width: '100px',
                                       height: '100px',
                                       borderRadius: '100%',
                                 overflow: 'hidden',
                               //  marginRight: '16px',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                               }}
                             >
                               {filePreview && (
                                 <img
                                   src={filePreview}
                                   alt='Preview'
                                   style={{
                                     width: '100%',
                                     height: '100%',
                                     objectFit: 'cover',
                                     borderRadius: '50%',
                                   }}
                                 />
                               )}
                             </div>

                   )}
                   <div>
                <Typography variant="h6" style={{ marginLeft: '30px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                             Upload Egg Donor's Photo
                              </Typography>
     {/* Display file name and size */}
           {selectedFile && (
                         <div>
                           {fileSizeError && (
                             <Typography variant='body1' color='error'>
                               File can't greater than 100 M
                             </Typography>
                           )}
                           <Typography variant='body1' style={{ textDecoration: 'underline', color: '#7F7572', marginLeft: '30px' }}>{fileName}</Typography>
                           <Typography variant='body1'style={{ textDecoration: 'underline', color: '#7F7572', marginLeft: '30px' }}>{fileSize}</Typography>
                         </div>
                       )}

                 <Button variant="contained" size="large" sx={{ marginTop: 2,marginLeft: '30px',border: '1px solid #926F63', backgroundColor: 'white',  }}
>
 <SourceOutlinedIcon sx={{ marginRight: '8px', color: '#926F63' }} />
                               <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' ,color: '#926F63',textTransform: 'none'}}>
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
</div>
</div>

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