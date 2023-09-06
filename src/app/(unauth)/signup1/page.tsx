import React from "react";
import { Box, Container, Input, Button } from "@mui/material";
import { Bg2 } from "@/components/background/bg2";

export default function Signup1() {
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
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <h1>Welcome to Signup Page 3</h1>

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
      </Container>
    </Box>
  );
}
