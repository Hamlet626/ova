import { Typography, Stack, Avatar, Grid, Box, Button } from '@mui/material'
import { outline_variant, neutral96 } from '@/components/ThemeRegistry/theme_consts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BarChart, Edit, EditNote, Link, ListAlt, Notifications, PersonAdd, ShoppingBag } from '@mui/icons-material'
import bag_icon from '@/assets/setting_logos/bag-front-color.png'
import bell_icon from '@/assets/setting_logos/bell-front-color.png'
import boy_icon from '@/assets/setting_logos/boy-front-color.png'
import chart_icon from '@/assets/setting_logos/chart-front-color.png'
import file_icon from '@/assets/setting_logos/file-text-front-color.png'
import notebook_icon from '@/assets/setting_logos/notebook-front-color.png'

export default async function Setting() {
  const user = (await getServerSession(authOptions))!.user!;

  return (
    <>
      <main>
        <Box sx={{
          margin: '50px 100px 50px 100px'
        }}>
          <Typography variant="h6">Setting</Typography>
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
                <Typography>
                  Price
                </Typography>
                <Stack direction={'row'}>
                  <Typography>
                    $1,234
                  </Typography>
                  <Edit />
                </Stack>
              </Stack>
              <Button
                variant="contained"
                sx={{
                  color: 'white',
                  textTransform: 'capitalize'
                }}
              >
                <Edit fontSize={'small'}/> Edit
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2} marginTop={5}>
            <Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={file_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Customize List</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={notebook_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Edit Files</Typography>
              </Box>
            </Grid><Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={bell_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Notification Setting</Typography>
              </Box>
            </Grid><Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={chart_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Feature</Typography>
              </Box>
            </Grid><Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={boy_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Feature</Typography>
              </Box>
            </Grid><Grid item xs={4}>
              <Box display={'flex'} p={1.5}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: neutral96,
                }}>
                <Avatar
                  src={bag_icon.src}
                  sx={{
                    width: '60px', height: '60px'
                  }}
                />
                <Typography alignSelf={'center'}>Feature</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  )
}