import React from "react";
import { Box, Container } from "@mui/material";
import SignUpBlock from "@/components/SignUpBlock";
import SigninBlock from "@/components/SigninBlock";

import { Bg1 } from "@/components/background/bg1";
import { Bg2 } from "@/components/background/bg2";

export default function SignUp() {
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
      {/* Use Bg1 component as the background */}
      <Bg1 />

      {/* Center the SignUpBlock */}
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          marginLeft: "100px", // Adjust this value as needed
        }}
      >
        <Container maxWidth="sm">
          <SignUpBlock /> {/* Your signup form component */}
        </Container>
      </Box>
    </Box>
  );
}