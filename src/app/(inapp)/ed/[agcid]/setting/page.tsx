import { Typography, Stack, Avatar, Grid, Box, Button, Dialog } from '@mui/material'
import { outline_variant, neutral96, font5, PageHeader, font7 } from '@/components/ThemeRegistry/theme_consts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bag_icon from '@/assets/setting_logos/bag-front-color.png'
import bell_icon from '@/assets/setting_logos/bell-front-color.png'
import boy_icon from '@/assets/setting_logos/boy-front-color.png'
import chart_icon from '@/assets/setting_logos/chart-front-color.png'
import file_icon from '@/assets/setting_logos/file-text-front-color.png'
import notebook_icon from '@/assets/setting_logos/notebook-front-color.png'
import UserDashboard from './user_dashboard'
import Feature from './feature'

export default async function Setting() {
  const user = (await getServerSession(authOptions))!.user!;

  return (
    <>
      <Box sx={{
        width: '75vw',
        paddingTop: '50px',
        margin: 'auto'
      }}>
        <Typography sx={PageHeader}>Setting</Typography>
        <UserDashboard user={user}/>
        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={4}>
          <Feature
              icon={file_icon}
              feature={'Customize List'}
            />
          </Grid>
          <Grid item xs={4}>
          <Feature
              icon={notebook_icon}
              feature={'Edit Files'}
            />
          </Grid>
          <Grid item xs={4}>
            <Feature
              icon={bell_icon}
              feature={'Notification Setting'}
            />
          </Grid>
          <Grid item xs={4}>
            <Feature
              icon={chart_icon}
              feature={'Feature'}
            />
          </Grid>
          <Grid item xs={4}>
            <Feature
              icon={boy_icon}
              feature={'Feature'}
            />
          </Grid>
          <Grid item xs={4}>
            <Feature
              icon={bag_icon}
              feature={'Feature'}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}