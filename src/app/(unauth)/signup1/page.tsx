import React from "react";
import { Box, Container, Input, Button, Typography, LinearProgress } from "@mui/material";
import { Bg2 } from "@/components/background/bg2";


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
      <LinearProgress variant="determinate" value={66.67} sx={{ width: "800px", backgroundColor: "grey", "& .MuiLinearProgress-bar": { backgroundColor: "orange" } }} />
             </Box>


      {/* Center the content */}
      {/* Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align content to the top left
          justifyContent: "flex-start", // Align content to the top left
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
      </Container> */}
    </Box>
  );
}