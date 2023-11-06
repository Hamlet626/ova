import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import {typedLists} from "@/utils/form/consts";
// import { languages,eyeColors,hairColors,ethnicities,nationalities,countryList,physicalTraits,dominantHands,} from "@/utils/form/consts";
import React, { useState } from 'react';


export default function FormFieldUI({data,register}:{data:FormField,register:any}){

const fieldHeight = data.length === 'long' ? '3' : 'auto';



        console.log(data.length);
        console.log(data.options);
const [formData, setFormData] = useState([{ language: '', fluency: 'Fluent' }]);
const handleChange = (index, field, value) => {
  setFormData((prevData) => {
    const updatedData = [...prevData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    return updatedData;
  });
};
  const handleAddGroup = () => {
    setFormData([...formData, { language: '', fluency: 'Fluent' }]);
  };

    const handleRemoveGroup = (index) => {
      setFormData((prevData) => {
        const updatedData = [...prevData];
        updatedData.splice(index, 1);
        return updatedData;
      });
    };




    return <Stack key={data.id} mb={4} sx={{   }}>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={8}/>
        {data.type==='text'?[<TextField variant="outlined"   style={{ borderRadius: '50%',width: '100px',  height: '100px', padding: '16px',
                                                             }}/>
//         <FormHelperText error>Please fill in valid values</FormHelperText>
        ]
        :data.type==='date'?[<DateField variant="standard" />]
        :data.type==='multi-select'?[<Select>
           {Array.isArray(typedLists[data.options]) ? typedLists[data.options].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>) : null }
           {Array.isArray(data.options) ? data.options.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>) : null }


                                     </Select>
]
        :data.type==='yes/no'?[<ToggleButtonGroup exclusive>
            <ToggleButton value={'yes'}>Yes</ToggleButton>
            <ToggleButton value={'no'}>No</ToggleButton>
        </ToggleButtonGroup>]
        :data.type==='checkbox'?[<ToggleButtonGroup style={{ width: '500px', overflow: 'auto' }}>
   {Array.isArray(typedLists[data.options]) ? typedLists[data.options].map((v) => <ToggleButton key={v} value={v}>{v}</ToggleButton>) : null }
   {Array.isArray(data.options) ? data.options.map((v) => <ToggleButton key={v} value={v}>{v}</ToggleButton>) : null }

      </ToggleButtonGroup>]

        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />]
        :data.type==='address'?[<Input />,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='name'?[]
        :data.type==='populate'?[

//        {data.group.map((groupData, i) => (
//        <Select key={groupData.id}>
//        {Array.isArray(typedLists[data.group[i].options]) &&
//          typedLists[data.group[i].options].map((v) => (ç
//           <MenuItem key={v} value={v}>
//             {v}
//           </MenuItem>
//         )}
//       </Select>
//   )}



]
        :[]

//check object is list
//      Array.isArray(typedLists[data.options])
              }

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