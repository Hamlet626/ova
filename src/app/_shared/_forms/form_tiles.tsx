import { font5, font6 } from "@/components/ThemeRegistry/theme_consts"
import { FormTempStatusCpx } from "@/utils/form/form_utils/status"
import { Timeline } from "@mui/icons-material"
import { Stack, Card, CardActionArea, CardContent, Typography, LinearProgress, Divider, Box, Chip } from "@mui/material"
import Link from "next/link"

export const FormStatsTiles=({formsStatus,prePath}:{formsStatus:FormTempStatusCpx[],prePath:string})=>{
    return <Stack spacing={2}>
    {formsStatus.map((v,i)=>(
        <Card key={v.title} variant="outlined">
            <Link href={`${prePath}/${v.index}?section=${encodeURIComponent(v.subs.remained[0])}`}>
                <CardActionArea>
                <CardContent>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Typography variant="subtitle2" flexGrow={1}>{v.title}</Typography>
                    <Timeline/>
                    <Box width={8}/>
                    <Typography sx={font5}>Time Estimate: {v.stats.time}</Typography>
                    <Box width={40}/>
                    <LinearProgress value={v.stats.finished/v.stats.all*100} sx={{width:'136px'}}/>
                    <Box width={12}/>
                    <Typography sx={font5}>{v.stats.finished}/{v.stats.all} questions</Typography>
                </Box>
                </CardContent>
            </CardActionArea>
            </Link>
            <Divider/>
            <CardContent>
                <Box display={'flex'} flexDirection={'row'} height={60}>
                    <SubfieldsBlock section={v.subs.remained} prePath={prePath} formIndex={i}/>
                    <Divider orientation="vertical" sx={{mx:'27px'}}/>
                    <SubfieldsBlock section={v.subs.finished} prePath={prePath} formIndex={i} finished/>
                </Box>
            </CardContent>
        </Card>
    ))}
</Stack>
}


const SubfieldsBlock=({section,finished,prePath,formIndex,sx}:{section:any[],finished?:boolean,prePath:string,formIndex:Number, sx?:any})=>{
    return(<Box display={'flex'} flexDirection={'column'} flex={1} {...sx}>
        <Typography sx={font6}>{finished?'Finished Question Group':'Remained Question Group'}</Typography>
        <Box height={8}/>
        <Stack spacing={1} direction={'row'}>
            {...section.map(v=>(
                <Chip component={Link} href={`${prePath}/${formIndex}?section=${encodeURIComponent(v)}`}
            key={v} label={v} color={finished?'secondary':'primary'} clickable />
            ))}
        </Stack>
    </Box>);
}