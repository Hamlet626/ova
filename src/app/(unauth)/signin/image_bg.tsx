import {Box, Container} from "@mui/material";
import Image from "next/image";
import bg from "@/assets/login_bg.png"
import logo from "@/assets/ova_logo.svg"


export const ImageBg = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'max(100vh,560px)',
        position: 'relative',
    };

    const gradientStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '61%',
        height: '100%',
        background: 'linear-gradient(to left, transparent, white)',
    };


    return (
        <Container style={containerStyle}>
            <Image src={bg} alt="Your Image" fill
                objectFit="cover" objectPosition="center"/>
            <div style={gradientStyle}></div>
            <Image src={logo} alt="Logo" style={{
                width: '64px',
                height: '64px',
                position: 'absolute',
                top: '16px',
                right: '16px',
            }}/>
        </Container>
    );
};