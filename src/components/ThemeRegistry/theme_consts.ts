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
//"sugnup" in signup page
export const font2={
    fontFamily: roboto.style.fontFamily,
    fontSize: '45px',
    fontWeight: 500,
    lineHeight: '52px',
    letterSpacing: '0em',
     textAlign: 'center',
     marginTop: '16px',
};



export const font3={
    fontFamily: roboto.style.fontFamily,
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: '36px',
    letterSpacing: '0em',
    textAlign: 'left',
};

export const font5={
    fontFamily: roboto.style.fontFamily,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    textAlign: 'left',
};

export const font6={
    fontFamily: roboto.style.fontFamily,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.15px',
};

export const font7={
    fontFamily: roboto.style.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.15px',
};

export const font8={
    fontFamily: roboto.style.fontFamily,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.15px',
};

export const outline_variant='#D8C2BB';
export const neutral96='#FEF1ED';
export const OVA_very_soft_grey='#EEF0F4';
export const primary90="#FFDBCE";
// if you want to def M3_Primary70="#F98F64" please use primary.main
