import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useEffect } from 'react';
import {typedLists} from "@/utils/form/consts";
// import { languages,eyeColors,hairColors,ethnicities,nationalities,countryList,physicalTraits,dominantHands,} from "@/utils/form/consts";
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {OVA_very_soft_grey,primary90} from "@/components/ThemeRegistry/theme_consts.ts";




export default function FormFieldUI({data,register}:{data:FormField,register:any}){

  const fieldLength = data.length === 'long' ? 3 : data.length === 'short' ? 0.5 : 1; // Set the default to 2 or adjust as needed

  const selectedValues = Array.isArray(register(data.id)) ? register(data.id) : [];
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    // Set initial values on mount
    const initialValues = getValues(data.id);
    if (!initialValues) {
      setValue(data.id, []);
    }
  }, [data.id, getValues, setValue]);

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
        {data.type==='text'?[<TextField multiline minRows={fieldLength }  variant="outlined"  sx={{ flex: 1 }} />
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
          <Box display="flex" flexWrap="wrap">
          {(Array.isArray(typedLists[data.options]) ? typedLists[data.options] : []).map((v) => (
            <CardContent
              key={v}
              value={v}
              sx={{
                margin: 1,
                backgroundColor: getValues(data.id)?.includes(v) ? primary90 : OVA_very_soft_grey,
                cursor: 'pointer',
                borderRadius: 1,
                height: 'auto',
                width: 'auto',
              }}
              onClick={() => {
                const updatedValues = getValues(data.id)?.includes(v)
                  ? getValues(data.id).filter((value) => value !== v)
                  : [...getValues(data.id), v];
                setValue(data.id, updatedValues);
              }}
            >
              {v}
            </CardContent>
          ))}
        </Box>
            
    
    
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