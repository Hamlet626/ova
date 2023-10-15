import {//Button, Input,
    Box, Button, Link, Typography
} from "@mui/material";
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import SigninEmailPwBlock from "@/components/signin_email_pw";
import { font1 } from "@/components/ThemeRegistry/theme_consts";


export default function SigninBlock() {
    return(
        // <Stack direction="column" justifyContent="center" alignItems="flex-start" maxWidth="400px">
        <Box maxWidth="400px">
            <Typography variant='h6'>Welcome to OVA,</Typography>
            <Box height={16}/>
            <Typography sx={font1}>Log In</Typography>
            <Box height={64}/>
            <SigninEmailPwBlock/>
        </Box>
    )
        {/*</Stack>*/}

}