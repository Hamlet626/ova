import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        // primary: {main: "#0206f6"}
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        subtitle3: {
            fontSize: '4rem',
        },
        body3: {
            fontSize: '4rem',
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    // Map subtitle3, body3 to render a <h6>, <p> respectively by default
                    subtitle3: 'h6',
                    body3: 'p',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root:{ borderRadius:"100px" }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === 'info' && {
                        backgroundColor: '#60a5fa',
                    }),
                }),
            },
        },
    },
});

export default theme;

///"Log In" in login page
export const font1={
    fontFamily: roboto.style.fontFamily,
    fontSize: '45px',
    fontWeight: 500,
    lineHeight: '52px',
    letterSpacing: '0em',
    textAlign: 'left',
};

///"sugnup" in signup page
export const font2={
    fontFamily: roboto.style.fontFamily,
    fontSize: '45px',
    fontWeight: 500,
    lineHeight: '52px',
    letterSpacing: '0em',
     textAlign: 'center',

};