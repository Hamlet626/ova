'use client';
import React from "react";
import {Card,  Box,  Input, Button, Typography, 
      InputAdornment,  Stack, CardMedia} from "@mui/material";


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";

//icons
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

//import style for image part
import { styled } from '@mui/material/styles';
import { app, cliAuth } from "@/utils/firebase/firebase_client";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { UserDoc } from "@/utils/firebase/database_consts";
import { useSession } from "next-auth/react";


const VisuallyHiddenInput = styled('input')({
  height: 8,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 8,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Uploadprofile( { clinic,role,c1 } ) {
  const {update,data}=useSession({required:true});
  const user=data?.user!;

    const [selectedFile,setSelectedFile]=useState<File|null>(null);

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
    
    const saveAvatar=async(url:string)=>{
        const r = await fetch('/api/update_profile', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            avatar: url,
          }),
        });
        
        if(r.status===200){
          await update({image:url}).then(v=>{console.log(v);});
          //console.log(user.image);

          //todo:redirect to filling form/template page
        }
    }

    return(
          <>
     <Box  sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
    <Card variant="outlined" sx={{backgroundColor:'ref', padding: 3, borderRadius: '10px', width: '600px', height: clinic === null ? '300px' : '200px',  position: 'relative',
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
            {clinic == null ? 'Upload Logo' : role === 0  ? "Upload Egg Donor's Photo" : "Upload Recipient's Photo"}
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


{clinic ==null && (
      <Input name="url" fullWidth placeholder="Desired URL" variant="outlined"  type="text" sx={{ width: '100%', marginTop: '24px' }}
      startAdornment={ <InputAdornment position="start"> <LinkOutlinedIcon /></InputAdornment> }
      />
    )}
</Card>
 </Box>


 <Box height={220}/>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
         {c1}
          <Button
            fullWidth
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            sx={{
              typography: 'label1',
              color: 'white',
              width: '193px',
            }}
            onClick={()=>{
              //todo: saveAvatar('imageLink');
            }}
          >
            Next
          </Button>
        </Box>
        </>
    )
}