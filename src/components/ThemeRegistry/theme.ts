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
        h1: {
            fontSize: '57px',
            fontWeight: 400,
            lineHeight: '64px',
            letterSpacing: '-0.25px',
        },
        h2: {
            fontSize: '45px',
            fontWeight: 400,
            lineHeight: '52px',
            letterSpacing: '0px',
        },
        h3: {
            fontSize: '36px',
            fontWeight: 400,
            lineHeight: '44px',
            letterSpacing: '0px',
        },
        h4: {
            fontSize: '32px',
            fontWeight: 400,
            lineHeight: '40px',
            letterSpacing: '0px',
        },
        h5: {
            fontSize: '28px',
            fontWeight: 400,
            lineHeight: '36px',
            letterSpacing: '0px',
        },
        h6: {
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: '32px',
            letterSpacing: '0px',
        },
        subtitle1: {
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: '28px',
            letterSpacing: '0px',
        },
        subtitle2: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '0.15px',
        },
        overline: {
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: '0.5px',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '0.5px',
        },
        body2: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '0.5px',
        },
        caption: {
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: '0.4px',
        },

        
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


