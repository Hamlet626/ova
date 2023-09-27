import { Typography, Container, Avatar, Grid, Box } from '@mui/material'
import { outline_variant } from '@/components/ThemeRegistry/theme_consts'

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
              <Typography>Brandon</Typography>
              <Grid container item>
                <Avatar
                  sx={{ width: 28, height: 28}}
                >A</Avatar>
                <Typography>www.ova.com/brandon</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </>
  )
}