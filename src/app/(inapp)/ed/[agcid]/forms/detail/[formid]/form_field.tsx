import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useForm,Controller  } from "react-hook-form";
import {typedLists} from "@/utils/form/consts";
// import { languages,eyeColors,hairColors,ethnicities,nationalities,countryList,physicalTraits,dominantHands,} from "@/utils/form/consts";
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {OVA_very_soft_grey,primary90} from "@/components/ThemeRegistry/theme_consts.ts";




export default function FormFieldUI({data,register}:{data:FormField,register:any}){

// const fieldLength =fieldHeight data.length == 'long' ? '3' : '1';

const { control, handleSubmit } = useForm();

   const [cardStates, setCardStates] = useState({});

   const handleCardClick = (value) => {
     setCardStates((prevStates) => ({
       ...prevStates,
       [value]: !prevStates[value],
     }));
   };


//
//         console.log(data.length);
//         console.log(data.options);
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




    return <Stack key={data.id} mb={4} >
        <Typography variant="body1">{data.label}</Typography>
        <Box height={8}/>
        {data.type==='text'?[<TextField multiline minRows={3}  variant="outlined"   />
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
        :data.type==='checkbox'?[ 
        <form>
          <Controller
            name="checkboxOptions"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Box display="flex" flexWrap="wrap">
                {(Array.isArray(typedLists[data.options]) ? typedLists[data.options] : []).map((v) => (
                  <CardContent
                    key={v}
                    value={v}
                    sx={{
                      margin: 1,
                      backgroundColor: field.value.includes(v) ? primary90: OVA_very_soft_grey,
                      cursor: 'pointer',
                      borderRadius: 1,
                      height: 'auto',
                       width: 'auto',
                    }}
                    onClick={() => {
                      const updatedValues = field.value.includes(v)
                        ? field.value.filter((value) => value !== v)
                        : [...field.value, v];
                      field.onChange(updatedValues);
                    }}
                  >
                    {v}
                  </CardContent>
                ))}
              </Box>
            )}
          />
    
        </form>
        ]

        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />]
        :data.type==='address'?[<Input />,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='name'?[]
        :data.type==='populate'?[





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