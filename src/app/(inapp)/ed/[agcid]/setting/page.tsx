import { Typography, Container, Avatar, Grid, Box } from '@mui/material'
import { outline_variant, neutral96 } from '@/components/ThemeRegistry/theme_consts'

export default async function Setting() {
  return (
    <>
      <main>
        <Typography variant="h6">Setting</Typography>
        <Grid container
          sx={{
            border: '1px',
            borderStyle: 'solid',
            borderColor: outline_variant,
            borderRadius: '12px',
            padding: '20px 32px 20px 32px',
            marginTop: '24px'
          }}>
          <Grid container>
            <Grid container item
              sx={{
                borderRight: '1px',
                borderStyle: 'solid',
                borderColor: outline_variant
              }}
            >
              <Grid item>
                <Avatar
                  sx={{ width: 138, height: 138}}
                >B</Avatar>
              </Grid>
              <Grid item
                direction={'column'}
                alignSelf={'center'}
                justifySelf={'center'}
                sx={{
                  padding: '0px 16px 0px 0px'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'roboto.style.fontFamily',
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: '32px'
                  }}
                >Brandon</Typography>
                <Grid container item>
                  <Avatar
                    sx={{ width: 28, height: 28}}
                  >A</Avatar>
                  <Typography
                    sx={{
                      fontFamily: 'roboto.style.fontFamily',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0.5px'
                    }}
                  >www.ova.com/brandon</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5} sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>H</Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid>
        </Grid>
      </main>
    </>
  )
}