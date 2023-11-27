import { Checkbox, FormControlLabel, FormControlLabelProps, IconButton, Link, Stack, TextField, Typography, styled } from "@mui/material";
import { Control, Controller } from "react-hook-form";


export const CheckboxField=({useFromControl,name,...others}:Omit<FormControlLabelProps,'control'>&{useFromControl:Control<any>,name:string})=>{
    return <Controller 
    control={useFromControl}
    render={({ field })=> {
        return <FormControlLabel 
        control={<Checkbox value={field.value}/>}
        {...others}
        checked={field.value}
        onChange={(ev,v)=>{
            field.onChange(v);
            if(others.onChange!=null)others.onChange(ev,v);
        }}
        />;
    } } name={name}/>
}