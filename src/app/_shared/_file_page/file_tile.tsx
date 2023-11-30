import { processCldUrl } from "@/utils/cloudinary/utils"
import { FileData } from "@/utils/firebase/types"
import { Download } from "@mui/icons-material"
import { Card, CardActionArea, CardMedia, Stack, Typography, CardActions, IconButton, CardContent, CardHeader } from "@mui/material"

export const FileTile=({data,openEditDlg}:{data:FileData,openEditDlg:Function})=>{
    // const [fileData]=usePromise(async()=>{
    //     const r=await cloudinary.api.resource(data.url);
    //     return r;
    // },[data.url]);

    return <Card elevation={0}>
        <CardActionArea onClick={()=>openEditDlg()}>
            <CardMedia src={data.url} component={'img'} sx={{borderRadius:'12px', aspectRatio:1.2}}/>
        </CardActionArea>
        <CardHeader 
        title={data.name}
        sx={{
            "& .MuiCardHeader-content": {
                display:'block',
              overflow: "hidden",
            }
          }}
        titleTypographyProps={{variant:'body2',
        ///two line ellipse
        style:{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }
        }}
        action={<IconButton href={processCldUrl(data.url!,data.name).downloadUrl}><Download/></IconButton>}
        >
        </CardHeader>
        </Card>
}