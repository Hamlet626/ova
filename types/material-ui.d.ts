declare module '@mui/material/styles' {
    interface TypographyVariants {
        subtitle3: React.CSSProperties;
        body3: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        subtitle3?: React.CSSProperties;
        body3?: React.CSSProperties;
    }
  }
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        subtitle3: true;
        body3: true;
    }
  }
  