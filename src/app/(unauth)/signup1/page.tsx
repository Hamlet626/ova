import React from "react";
import {Paper, Box, Container, Input, Button, Typography, LinearProgress } from "@mui/material";
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


                  <Button
                    variant="contained"
                    size="large"
                    sx={{ marginTop: 2 }}
                  >
                   <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
                                                 Browse Photos
                                               </label>
                                                <input type="file"
                                                       accept="image/*"
                                                        id="file-upload"
                                                        style={{ display: 'none' }}/>
                  </Button>


                </Paper>
              </Box>
            </Box>
          );
        }