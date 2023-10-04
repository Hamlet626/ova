declare module '@mui/material/styles' {
    interface TypographyVariants {
        subtitle3: React.CSSProperties;
        label1: React.CSSProperties;
        label2: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        subtitle3?: React.CSSProperties;
        label1?: React.CSSProperties;
        label2?: React.CSSProperties;
    }
  }
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        subtitle3: true;
        label1: true;
        label2: true;
    }
  }
  
  declare module '@mui/material' {
    interface TypographyPropsVariantOverrides {
        subtitle3: true;
        label1: true;
        label2: true;
    }
}
  