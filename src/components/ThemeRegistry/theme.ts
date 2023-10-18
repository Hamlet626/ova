import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { outline_variant } from './theme_consts';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {main: '#FFA07A'},
        secondary: {main: '#ad897b'},
        tertiary: {main: '#9c915d'}
    },

    shape:{borderRadius:12},
    typography: {
        fontFamily: roboto.style.fontFamily,
        subtitle3: {
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.1px',
            textAlign: 'left'
        },
        label1: {
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.1px',
            textAlign: 'left'
        },
        label2: {
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '16px',
            letterSpacing: '0.5px',
            textAlign: 'left'
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    // Map subtitle3, label1, label2 to render a <label> by default
                    subtitle3: 'label',
                    label1: 'label',
                    label2: 'label',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root:{ borderRadius:"100px" }
            }
        },
        MuiDivider:{
            styleOverrides: {
                root:{ backgroundColor: outline_variant }
            }
        },
        MuiLinearProgress:{
            defaultProps:{
                variant:"determinate"
            }
        }
        // MuiAlert: {
        //     styleOverrides: {
        //         root: ({ ownerState }) => ({
        //             ...(ownerState.severity === 'info' && {
        //                 backgroundColor: '#60a5fa',
        //             }),
        //         }),
        //     },
        // },
    },
});

export default theme;


