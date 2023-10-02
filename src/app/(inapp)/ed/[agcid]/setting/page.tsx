import { Typography, Container, Avatar, Grid, Box } from '@mui/material'
import { outline_variant, neutral96 } from '@/components/ThemeRegistry/theme_consts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BarChart, EditNote, Link, ListAlt, Notifications, Person, PersonAdd, ShoppingBag } from '@mui/icons-material'

export default async function Setting() {
  const user = (await getServerSession(authOptions))!.user!;

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
                  sx={{
                    width: 138,
                    height: 138,
                    marginRight: 2,
                    bgcolor: 'primary.main'
                  }}
                >{user.picture}</Avatar>
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
                >{user.name}</Typography>
                <Grid container item>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <ListAlt />
              </Avatar>
              <Typography alignSelf={'center'}>Customize List</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <EditNote />
              </Avatar>
              <Typography alignSelf={'center'}>Edit Files</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <Notifications />
              </Avatar>
              <Typography alignSelf={'center'}>Notification Setting</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <BarChart />
              </Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <PersonAdd />
              </Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid><Grid item xs={4}>
            <Box display={'flex'} p={1.5}
              sx={{
                borderRadius: '12px',
                backgroundColor: neutral96,
              }}
            >
              <Avatar sx={{
                width: '60px', height: '60px'
              }}>
                <ShoppingBag />
              </Avatar>
              <Typography alignSelf={'center'}>Feature</Typography>
            </Box>
          </Grid>
        </Grid>
      </main>
    </>
  )
}