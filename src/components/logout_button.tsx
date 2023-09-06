'use client'
import {Button} from "@mui/material";
import { signOut } from "next-auth/react"

export const LogoutButton=()=>{
    return <Button onClick={()=>signOut()}>log out</Button>;
}