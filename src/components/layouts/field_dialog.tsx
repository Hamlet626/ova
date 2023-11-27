import { Dialog, DialogProps, ThemeProvider, useTheme } from "@mui/material";

export const FieldDialog=({...prop}:DialogProps)=>{
    const parentTheme = useTheme();

  // Create a custom theme based on the parent theme
  const customTheme = {
    ...parentTheme,
    components: {
      MuiButton: {
        defaultProps:{
            variant:'standard'
        },
      },
    },
  };
    
  return  <ThemeProvider theme={customTheme}>
    <Dialog {...prop}/>
    </ThemeProvider>;
}