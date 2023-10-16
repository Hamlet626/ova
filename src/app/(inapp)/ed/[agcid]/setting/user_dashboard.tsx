'use client';
import { useState } from 'react'
import { Box, Avatar, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, Grid, DialogActions } from "@mui/material";
import { Edit, Link } from "@mui/icons-material";
import { outline_variant, font3, font5 } from "@/components/ThemeRegistry/theme_consts";

export default function UserDashboard({ user }:{ user:any }) {
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          border: '1px',
          borderStyle: 'solid',
          borderColor: outline_variant,
          borderRadius: '12px',
          padding: '20px 32px 20px 32px',
          marginTop: '24px',
          width: '100%'
        }}>
        <Box
          sx={{
            display: 'flex',
            borderRight: '1px',
            borderStyle: 'solid',
            borderColor: outline_variant,
            paddingRight: 4
          }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              marginRight: 3,
              bgcolor: 'primary.main'
            }}
          >{user.image}</Avatar>
          <Stack
            direction='column'
            justifyContent={'center'}
          >
            <Typography
              sx={{
                fontFamily: 'roboto.style.fontFamily',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '32px'
              }}
            >{user.name}</Typography>
            <Stack direction={'row'}>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  bgcolor: 'primary.main'
                }}
              >
                <Link />
              </Avatar>
              <Typography
                sx={{
                  fontFamily: 'roboto.style.fontFamily',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0.5px',
                  marginLeft: 1
                }}
              >{user.email}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 4,
            width: '100%'
          }}
        >
          <Stack direction={'column'}>
            <Typography color={'secondary'} sx={font5}>
              Price
            </Typography>
            <Stack direction={'row'}>
              <Typography sx={font3}>
                $1,234
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{
              color: 'white',
              textTransform: 'capitalize'
            }}
            onClick={handleClickOpen}
          >
            <Edit fontSize={'small'} sx={{marginRight:'3px'}}/> Edit
          </Button>
        </Box>
      </Box>
      <Dialog
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle>Edit User Information</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column">
              <TextField
                name={"name"}
                label={"Name"}
                sx={{
                  margin: '7px 0px 7px 0px'
                }}
              />
              <TextField
                name={"email"}
                label={"Email"}
                sx={{
                  margin: '7px 0px 7px 0px'
                }}
              />
              <DialogActions>
                <Button>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}