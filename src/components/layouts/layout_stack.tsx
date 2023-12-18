import { Stack, StackOwnProps } from "@mui/material";
import { ReactNode } from "react";

export const LOStack=({children,...prop}:StackOwnProps&{children:ReactNode})=>{
    return <Stack direction={'row'} spacing={3} alignItems={'center'} {...prop}>
        {children}
    </Stack>
}