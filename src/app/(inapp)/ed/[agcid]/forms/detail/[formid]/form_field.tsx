import { FormField } from "@/utils/form/template";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";

export default function FormFieldUI({data,register}:{data:FormField,register:any}){
    return <Stack>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={32}/>
        {data.type==='text'?[<Input/>,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='date'?[<DateField/>]
        :data.type==='multi-select'?[<Select/>]
        :data.type==='yes/no'?[<ToggleButtonGroup exclusive>
            <ToggleButton value={'yes'}>Yes</ToggleButton>
            <ToggleButton value={'no'}>No</ToggleButton>
        </ToggleButtonGroup>]
        :data.type==='checkbox'?[<ToggleButtonGroup>
            {data.options!.map(v => <ToggleButton value={v}>{v}</ToggleButton>)}
        </ToggleButtonGroup>]
        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />]
        :data.type==='address'?[]
        :data.type==='name'?[]
        :data.type==='populate'?[]
        :[]}


        {/* <TextField select
        // inputRef={register("password")}

        // SelectProps={{
        //     native: true,
        //     inputProps: { ref: register, name: 'password' }
        //   }}

        {...register("password")}
        >
            <MenuItem key="" value="">
            <em>None</em>
          </MenuItem>
          <MenuItem key={10} value={10}>Ten</MenuItem>
          <MenuItem key={20} value={20}>Twenty</MenuItem>
          <MenuItem key={30} value={30}>Thirty</MenuItem>
        </TextField> */}
    </Stack>
}