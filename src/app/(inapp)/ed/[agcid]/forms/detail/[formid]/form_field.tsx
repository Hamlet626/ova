import { FormField } from "@/utils/form/template";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";

export default function FormFieldUI({data}:{data:FormField}){
    const {control, register, formState:{errors} }=useForm({defaultValues:{"password":10}});
    return <Stack>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={32}/>
        ...{data.type==='text'?[<Input/>,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='date'?[<DateField/>]
        :data.type==='multi-select'?[<Select/>]
        :data.type==='yes/no'?[<Select/>]
        :[]}


        <TextField select
        // inputRef={register("password")}

        // SelectProps={{
        //     native: true,
        //     inputProps: { ref: register, name: 'password' }
        //   }}

        {...register("password")}
        >
            {/* <option key="" value="">Select...</option>
        <option key="A" value="A">Category A</option>
        <option key="B" value="B">Category B</option> */}
            <MenuItem key="" value="">
            <em>None</em>
          </MenuItem>
          <MenuItem key={10} value={10}>Ten</MenuItem>
          <MenuItem key={20} value={20}>Twenty</MenuItem>
          <MenuItem key={30} value={30}>Thirty</MenuItem>
        </TextField>
    </Stack>
}