import { useConsistForm, useLastestValue } from "@/utils/server_data_getter/hooks";
import { Button, DialogActions, DialogContent, Stack, TextField, } from "@mui/material";
import { useAPILoadingError } from "@/components/api_process/use_api_loading_error";
import LoadingButton from "@mui/lab/LoadingButton";
import { FieldDialog } from "@/components/layouts/field_dialog";
import { CheckboxField } from "@/components/form_fields/check_box_field";

export const CreateFileDialog=({close,data,updateData}:
    {close:()=>void,data?:File,updateData:Function})=>{

        const open=data!=null;
        const fileData=useLastestValue(data);

    const {loading,handleCallAPI,errNotiComponent}=useAPILoadingError(async(fileInfo)=>{

        const formData = new FormData();
              formData.append("file", data!);
              formData.append("upload_preset", "public-files");

              const fileRes=await fetch('https://api.cloudinary.com/v1_1/pc-ova/image/upload', {
                method: "POST",
                body: formData
            })
            .then(async(response) => {
                return (await response.json());
            })
            await updateData({url:fileRes.secure_url,...fileInfo})
    });
    

    const {handleSubmit,register,control}=useConsistForm({defaultValues:{name:fileData?.name,selfVisible:true}});

    return <>
    <FieldDialog open={open} onClose={()=>{
        close();
    }}>
            <Stack direction={'row'}>
                    {fileData && <img src={URL.createObjectURL(fileData)} style={{width: '186px',
                    height: '186px',
                    objectFit: 'cover'}}/>}
                    <Stack>
                    <DialogContent>
                        <form>
                            <Stack>
                            <TextField {...register('name')} variant="standard"/>
                            <CheckboxField useFromControl={control} 
                            label={'ED visible'} name='selfVisible'
                            />
                            </Stack>
                        </form>
                        </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={()=>close()}>Cancel</Button>
                <LoadingButton loading={loading} variant='contained' onClick={handleSubmit(async(data)=>{
                    const success=await handleCallAPI(data);
                    if(success)return close();
                })}>upload</LoadingButton>
            </DialogActions>
            </Stack>
            </Stack>
    </FieldDialog>
    {errNotiComponent}
    </>;
}