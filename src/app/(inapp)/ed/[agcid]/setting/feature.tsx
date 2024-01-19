'use client'
import { Box, Avatar, Typography } from "@mui/material"
import { neutral96, nameLabel } from "@/components/ThemeRegistry/theme_consts"

export default function Feature({ icon, feature }: { icon:any, feature:string }) {
  return (
    <Box display={'flex'} p={1.5}
      sx={{
        borderRadius: '12px',
        backgroundColor: neutral96,
      }}>
      <Avatar
        src={icon.src}
        sx={{
          width: '60px', height: '60px',
          marginRight: 1.5
        }}
      />
      <Typography sx={nameLabel} alignSelf={'center'}>{feature}</Typography>
    </Box>
  )
}