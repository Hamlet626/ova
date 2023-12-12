import { ListItem, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

export const RightMenuTile=({title,children}:{title:string,children:ReactNode})=>{
    return <ListItem>
        <Stack pl={3} pr={4} spacing={1} width={'100%'}>
            <Typography variant="subtitle2">{title}</Typography>
            {children}
            </Stack>
    </ListItem>
}