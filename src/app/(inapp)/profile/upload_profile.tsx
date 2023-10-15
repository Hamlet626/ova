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
import { useSearchParams } from 'next/navigation';
import {useSession} from "next-auth/react";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";




const VisuallyHiddenInput = styled('input')({
  height: 8,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 8,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export function uploadprofile() {
   console.log('d');
  const { data: session } = useSession();
    const role = session?.user?.role;
    const clinic = session?.user?.agencies?.[0];

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

 <Box  sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
<Card variant="outlined" sx={{backgroundColor:'ref', padding: 3, borderRadius: '10px', width: '600px', height: clinic !== null ? '300px' : '200px',  position: 'relative',
                                                                                                                                                       zIndex: 1, }}>

      <Stack direction="row" alignItems="center" spacing={2}>
        {selectedFile && (
          <CardMedia
            component="img"
            src={URL.createObjectURL(selectedFile)}
            sx={{
              width: '160px',
              height: '160px',
              borderRadius: '100%',
            }}
          />
        )}

        <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
          <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {clinic === null ? 'Upload Logo' : role === 0  ? "Upload Egg Donor's Photo" : "Upload Recipient's Photo"}
          </Typography>
          {selectedFile && (
            <Stack spacing={1}>
              <Typography variant="body1" sx={{ textDecoration: 'underline', color: 'ref' }}>
                {selectedFile.name}
              </Typography>
              <Typography variant="body1" sx={{ textDecoration: 'underline', color: 'ref' }}>
                {formatFileSize(selectedFile.size)}
              </Typography>
            </Stack>
            )}

  <Stack >
<Button component="label" variant="contained" startIcon={<SourceOutlinedIcon />} sx={{ typography: 'label1'}} >
      Browse Photos
      <VisuallyHiddenInput type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
    </Button>
    </Stack>

  </Stack>
    </Stack>


{clinic !== null && (
      <Input name="url" fullWidth placeholder="Desired URL" variant="outlined"  type="text" sx={{ width: '100%', marginTop: '24px' }}
      startAdornment={ <InputAdornment position="start"> <LinkOutlinedIcon /></InputAdornment> }
      />
    )}
</Card>
 </Box>

</>

)
 }
