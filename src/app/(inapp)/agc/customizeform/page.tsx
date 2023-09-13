import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/system/Stack';
import {Typography} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';



export default function SimpleContainer() {
    return (
        <Stack direction="row">
            <Box sx={{
                width: '297px',
                height:'941px',
                backgroundColor: '#FFFFFF',
                mt:'-25px'
            }}>
                <Typography variant="h4" sx={{ontFamily: 'roboto.style.fontFamily',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    letterSpacing: '0.15',
                    mt:'71px',
                    ml:'80px',
                    width:'57px',
                    height:'24px'
                }}>
                    Sign Up
                </Typography>
                <Typography sx={{ontFamily: 'roboto.style.fontFamily',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '32px',
                    mt:'133px',
                    ml:'80px',
                    width:'133px',
                    height:'32px'
                }}>
                    Create Form
                </Typography>git
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress sx={{
                    width:'869px',
                    height:'4px',
                    mt:'81px',
                    ml:'382px'
                }}/>
                <Typography variant="h5" sx={{color:'#926F63',
                    mt:'115px',
                    ml:'382px',
                    width:'206px',
                    height:'36px'
                }}>
                    Customize Form
                </Typography>
            </Box>
        </Stack>
    );
}