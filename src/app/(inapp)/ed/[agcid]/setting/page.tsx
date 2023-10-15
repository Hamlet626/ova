import { Typography, Stack, Avatar, Grid, Box, Button, Dialog } from '@mui/material'
import { outline_variant, neutral96, font5, font3, font7 } from '@/components/ThemeRegistry/theme_consts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bag_icon from '@/assets/setting_logos/bag-front-color.png'
import bell_icon from '@/assets/setting_logos/bell-front-color.png'
import boy_icon from '@/assets/setting_logos/boy-front-color.png'
import chart_icon from '@/assets/setting_logos/chart-front-color.png'
import file_icon from '@/assets/setting_logos/file-text-front-color.png'
import notebook_icon from '@/assets/setting_logos/notebook-front-color.png'
import UserDashboard from './user_dashboard'

export default async function Setting() {
  const user = (await getServerSession(authOptions))!.user!;

  return (
    <>
      <main>
        <Box sx={{
          width: '75vw',
          paddingTop: '50px',
          margin: 'auto'
        }}>
          <Typography sx={font3}>Setting</Typography>
          <UserDashboard user={user}/>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'} >Customize List</Typography>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'}>Edit Files</Typography>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'}>Notification Setting</Typography>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'}>Feature</Typography>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'}>Feature</Typography>
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
                    width: '60px', height: '60px',
                    marginRight: 1.5
                  }}
                />
                <Typography sx={font7} alignSelf={'center'}>Feature</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  )
}