import { Typography, Container, Avatar, Grid, Box } from '@mui/material'

export default async function Setting() {
  return (
    <>
      <main>
        <Typography variant="h6">Setting</Typography>
        <Grid container style={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: '#D8C2BB',
          borderRadius: '12px',
          padding: '20px 32px 20px 32px',
          marginTop: '24px'
        }}>
          <Grid container>
            <Grid item>
              <Avatar
                sx={{ width: 138, height: 138}}
              >B</Avatar>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </>
  )
}