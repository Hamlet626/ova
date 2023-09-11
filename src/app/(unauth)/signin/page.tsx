import {Box, Container} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SigninBlock from "@/app/(unauth)/signin/signin_block";
import Image from "next/image";
import bg from "@/assets/login_bg.png"
import logo from "@/assets/ova_logo.svg"
import { ImageBg } from "./image_bg";

export default function Signin() {
    return (
        // <Box > {/* Apply margin at the sides of the page */}
            <Grid2 container spacing={3} height='100vh' sx={{mx:2}}>
                <Grid2 md={5} display="flex" justifyContent="center" alignItems="center">
                    <SigninBlock/>
                </Grid2>
                <Grid2 md={7} >
                    <ImageBg/>
                </Grid2>
            </Grid2>
    )
}

