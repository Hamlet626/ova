import React from "react";
import { useRouter } from "next/navigation";
import { cliAuth  } from "@/utils/firebase/firebase_client";
import {//Button, Input,
    Box, Breadcrumbs, Button, Container, Input, InputAdornment, Link, Stack, TextField, Typography
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Bg1 } from "@/components/background/bg1";
import { Bg2 } from "@/components/background/bg2";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";

//import grid
import Grid from '@mui/material/Grid';


export default function Signup_profile() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Use Bg2 component as the background */}
      <Bg2 />
          {/* Sign Up text and progress bar */}
         <Box sx={{ position: "absolute", top: 0, left: 0, margin: "16px", display: "flex", alignItems: "center" }}>
               <Typography variant="h4" sx={{ marginRight: 10 }}>
                 Sign Up
               </Typography>
      <LinearProgress variant="determinate" value={66.67} sx={{ width:sm, backgroundColor: "grey", "& .MuiLinearProgress-bar": { backgroundColor: "orange" } }} />
             </Box>
<Box height={33}/>
       <Box
        maxWidth="sm"
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Align content to the top left
          justifyContent: "center", // Align content to the top left
          width: "100%",
          height: "100%",
        }}
      >


        <input type="file" accept="image/*" />

        <Input
          fullWidth
          placeholder="Name"
          sx={{ marginTop: 2 }}
        />

        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}