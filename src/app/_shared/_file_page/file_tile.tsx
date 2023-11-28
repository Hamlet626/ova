import { processCldUrl } from "@/utils/cloudinary/utils"
import { FileData } from "@/utils/firebase/types"
import { Download } from "@mui/icons-material"
import { Card, CardActionArea, CardMedia, Stack, Typography, CardActions, IconButton } from "@mui/material"

export const FileTile=({data,openEditDlg}:{data:FileData,openEditDlg:Function})=>{
    // const [fileData]=usePromise(async()=>{
    //     const r=await cloudinary.api.resource(data.url);
    //     return r;
    // },[data.url]);

    return <Card elevation={0}>
        <CardActionArea onClick={()=>openEditDlg()}>
            <CardMedia src={data.url} component={'img'} sx={{borderRadius:'12px', aspectRatio:1.2}}/>
        </CardActionArea>
        <Stack direction={'row'} alignItems={'center'}>
        <Typography variant="body2" flexGrow={1} textAlign={'center'} textOverflow={'clip'} noWrap>{data.name}</Typography>
        <CardActions>
            <IconButton href={processCldUrl(data.url!,data.name).downloadUrl}><Download/></IconButton>
        </CardActions>
        </Stack>
        </Card>
}