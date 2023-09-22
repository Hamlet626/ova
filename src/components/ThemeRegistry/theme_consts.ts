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

export const font2={
    fontFamily: roboto.style.fontFamily,
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: '36px',
    letterSpacing: '0em',
    textAlign: 'left',
};
export const font3={
    fontFamily: roboto.style.fontFamily,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0em',
    textAlign: 'left',
};

export const font4={
    fontFamily: roboto.style.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'left',
};

export const font5={
    fontFamily: roboto.style.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0em',
    textAlign: 'left',
};

export const font6={
    fontFamily: roboto.style.fontFamily,
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '0em',
    textAlign: 'left',
};

export const font7={
    fontFamily: roboto.style.fontFamily,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0em',
    textAlign: 'left',
};


export const outline_variant='#D8C2BB';
export const neutral96='#FEF1ED';
export const search_color= "#7F7572";
export const neutral_white= "#EEF0F4";