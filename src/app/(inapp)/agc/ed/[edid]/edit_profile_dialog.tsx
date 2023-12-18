import { Check, Remove } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Stack, TextField, DialogActions, Button, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfileDialog({ handleData, defaultValues, open }: { handleData:(v?:any)=>Promise<void>, defaultValues:any, open:boolean }) {
  const [loading,setLoading]=useState(false);
    const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm({defaultValues});

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues]);

    const onSubmit = async(value: any) => {
      setLoading(true);
      await handleData(value);
      setLoading(false);
    };
  
    return (<Drawer open={open} anchor="right">
        {/* <DialogTitle>Set backup account</DialogTitle> */}
        <form  onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack direction={'row'}>
            <TextField {...register('name')} variant="standard"/>
          </Stack>
          {['email','phone','price'].map(v=>(
            <TextField {...register(v)} variant="standard"/>
          ))}
        </Stack>
        <DialogActions>
          <Button variant='outlined' color="secondary" startIcon={<Remove/>}
          onClick={()=>{handleData();}}
          >cancel</Button>
          <LoadingButton variant='contained' startIcon={<Check/>} 
          loading={loading} type="submit">
            Save
            </LoadingButton>
        </DialogActions>
        </form>
      </Drawer>
    );
  }

  
  