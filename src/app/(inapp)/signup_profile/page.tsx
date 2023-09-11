import React from "react";
import { Box, Container, Input, Button, Typography } from "@mui/material";
import { Bg2 } from "@/components/background/bg2";

export function Signup_profile1(){
return()
}
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

      {/* Center the content */}
      <Container
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
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Sign Up
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome to Signup Page 2
        </Typography>
        {/* Upload Image */}
        <input type="file" accept="image/*" />

        {/* Name Input */}
        <Input
          fullWidth
          placeholder="Name"
          sx={{ marginTop: 2 }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
          {/*why do we have margin on the button?*/}
      </Container>
    </Box>
  );
}