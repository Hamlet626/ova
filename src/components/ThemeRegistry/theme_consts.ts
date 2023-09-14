import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

///"Log In" in login page
export const font1={
    fontFamily: roboto.style.fontFamily,
    fontSize: '45px',
    fontWeight: 500,
    lineHeight: '52px',
    letterSpacing: '0em',
    textAlign: 'left',
};


export const outline_variant='#D8C2BB';
export const neutral96='#FEF1ED';