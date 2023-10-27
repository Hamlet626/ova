import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import {typedLists} from "@/utils/form/consts";
import React, { useState } from 'react';


export default function FormFieldUI({data,register}:{data:FormField,register:any}){

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




    return <Stack key={data.id} mb={4}>
        <Typography variant="body1">{data.label}</Typography>
        <Box height={8}/>
        {data.type==='text'?[<Input/>,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='date'?[<DateField variant="standard" />]
        :data.type==='multi-select'?[<Select>
   {Array.isArray(typedLists[data.options]) ? typedLists[data.options].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>) : null }
                                               </Select>]
        :data.type==='yes/no'?[<ToggleButtonGroup exclusive>
            <ToggleButton value={'yes'}>Yes</ToggleButton>
            <ToggleButton value={'no'}>No</ToggleButton>
        </ToggleButtonGroup>]
        :data.type==='checkbox'?[<ToggleButtonGroup>
   {Array.isArray(typedLists[data.options]) ? typedLists[data.options].map((v) => <ToggleButton key={v} value={v}>{v}</ToggleButton>) : null }

      </ToggleButtonGroup>]

        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />]
        :data.type==='address'?[<Input />,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='name'?[]
        :data.type==='populate'?[
     <form>
         {formData.map((group, index) => (
           <div key={index}>
             <label htmlFor={`language-${index}`}>Language</label>
             <select
               id={`language-${index}`}
               value={group.language}
               onChange={(e) => handleChange(index, 'language', e.target.value)}
             >
               {Array.isArray(typedLists[data.group[0].options]) &&
                 typedLists[data.group[0].options].map((v) => (
                   <option key={v} value={v}>
                     {v}
                   </option>
                 ))}
             </select>
             <label htmlFor={`fluency-${index}`}>Fluency</label>
             <select
               id={`fluency-${index}`}
               value={group.fluency}
               onChange={(e) => handleChange(index, 'fluency', e.target.value)}
             >
               <option value="Fluent">Fluent</option>
               <option value="Intermediate">Intermediate</option>
               <option value="Beginner">Beginner</option>
             </select>
             <button type="button" onClick={() => handleRemoveGroup(index)}>
                         Remove
                       </button>
           </div>
         ))}
         <button type="button" onClick={handleAddGroup}>
           Add Language
         </button>
         <button type="submit">Submit</button>
       </form>
//         <Select
//                                   >
//                                     {Array.isArray(typedLists[data.group[0].options]) &&
//                                       typedLists[data.group[0].options].map((v) => (
//                                         <MenuItem key={v} value={v}>
//                                           {v}
//                                         </MenuItem>
//                                       ))}
//                                   </Select>
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