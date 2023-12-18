'use client'
import { LocalizationProvider } from "@mui/x-date-pickers";
import {SessionProvider} from "next-auth/react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const AuthSessionProvider=({children}: { children: React.ReactNode })=>{
    return(
        <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
        </SessionProvider>
    )
}