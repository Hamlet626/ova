import { outline_variant } from "@/components/ThemeRegistry/theme_consts";
import { getCliId_Server } from "@/utils/clinic_id/server";
import { subFieldKey } from "@/utils/form/form_utils/storage";
import { AlgoTemplates } from "@/utils/form/template";
import { formatTime } from "@/utils/formatters";
import { RoleNum } from "@/utils/roles";
import { getFormData, getFormTemplate } from "@/utils/server_data_getter/utils";
import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default async function EDOverview({params}:{params: { edid: string }}){
    const [formData,formTemp]=await Promise.all([
        getFormData(params.edid,RoleNum.ED),
        getFormTemplate(getCliId_Server()!)
    ]);
    const basics:{[k:string]:string}={};
    const tagged:{[k:string]:string}={};
    AlgoTemplates.forEach((formAlgoData,formIdx)=>{
        formAlgoData.forEach((algoData)=>{
            const key=Array.isArray(algoData.fdid)?subFieldKey(...algoData.fdid):algoData.fdid;
            const fieldData=formTemp[formIdx].content.flatMap(v=>v.fields).find(v=>v.id===key);
            const fieldValue=(
                //fieldData?.type==='checkbox'?(formData[formIdx]![key] as string[]|undefined)?.join(', '):
            fieldData?.type==='date'?formatTime(formData[formIdx]![key]):
            `${formData[formIdx]![key]}`)??''
            ;

            if(algoData.filter)basics[algoData.uiLabel??(fieldData?.label)??`${formIdx}:${key}`]=fieldValue;
            else tagged[algoData.uiLabel??(fieldData?.label)??`${formIdx}:${key}`]=fieldValue;
        })
    })

    console.log(basics,tagged)
    return <Stack width={'100%'}>
        <Card variant="outlined" sx={{borderColor:outline_variant}}>
            <CardContent>
                <Box display={'flex'} flexWrap={'wrap'} gap={'24px 40px'}>
                    {Object.entries(basics).map((et)=>(
                            <Stack key={et[0]}>
                                <Typography variant="body2" color='secondary'>{et[0]}</Typography>
                                <Typography variant="body1">{et[1]}</Typography>
                            </Stack>
                    ))}
                </Box>
                <Divider sx={{my:'12px'}}
                />
                <Box display={'flex'} flexWrap={'wrap'} gap={'24px 40px'}>
                    {Object.entries(tagged).map((et)=>(
                        <Stack key={et[0]}>
                            <Typography variant="body2" color='secondary'>{et[0]}</Typography>
                            <Typography variant="body1">{et[1]}</Typography>
                        </Stack>
                    ))}
                </Box>
            </CardContent>
        </Card>
    </Stack>
}