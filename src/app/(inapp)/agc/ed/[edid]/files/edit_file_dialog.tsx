import { FileData } from "@/utils/firebase/types";
import { useConsistForm, useLastestValue } from "@/utils/server_data_getter/hooks";
import { Button, Card, CardActionArea, CardMedia, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { useAPILoadingError } from "@/components/api_process/use_api_loading_error";
import LoadingButton from "@mui/lab/LoadingButton";
import { FieldDialog } from "@/components/layouts/field_dialog";
import { processCldUrl } from "@/utils/cloudinary/utils";
import { dialogHeader } from "@/components/ThemeRegistry/theme_consts";
import { CheckboxField } from "@/components/form_fields/check_box_field";

export const EditFileDialog=({close,data,removeData,updateData}:
    {close:()=>void,data?:FileData,removeData:()=>Promise<void>,updateData:(v:any)=>Promise<void>})=>{

        const open=data!=null;
        const fileData=useLastestValue(data);
        const fileDetail=fileData?.url==null?undefined:processCldUrl(fileData!.url!,fileData!.name);
    const {loading,handleCallAPI:remove,errNotiComponent}=useAPILoadingError(()=>removeData());
    
    const {register,control}=useConsistForm({defaultValues:fileData});

    return <>
    <FieldDialog open={open} onClose={()=>close()}>
            <Stack direction={'row'}>
            <Card elevation={0}>
                <CardActionArea href={fileData?.url??''} target="_blank">
                    <CardMedia src={fileData?.url} component={'img'} height={186} width={186} sx={{//borderRadius:'12px'
                }}/>
                </CardActionArea>
            </Card>
                    <Stack>
                    <DialogContent>
                        <form>
                            <Stack>
                            <Typography sx={dialogHeader}>{fileDetail?.fileName}</Typography>
                            <CheckboxField useFromControl={control}
                            label={'ED visible'} name='selfVisible' 
                            onChange={(ev,v)=>{
                                updateData({selfVisible:v});
                            }}
                            />
                            </Stack>
                        </form>
                        </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading}  variant="outlined" onClick={async()=>{
                    const success=await remove();
                    if(success)return close();
                }}
                >remove</LoadingButton>
                <Button variant='contained' href={fileDetail?.downloadUrl}>
                    Download
                    </Button>
            </DialogActions>
            </Stack>
            </Stack>
    </FieldDialog>
    {errNotiComponent}
    </>;
}