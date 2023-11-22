import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useEffect } from 'react';
import {typedLists} from "@/utils/form/consts";
// import { languages,eyeColors,hairColors,ethnicities,nationalities,countryList,physicalTraits,dominantHands,} from "@/utils/form/consts";
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {OVA_very_soft_grey,primary90} from "@/components/ThemeRegistry/theme_consts.ts";




export default function FormFieldUI({data,register,control}:{data:FormField,register:any,control:any }){

  const fieldLength = data.length === 'long' ? 3 : data.length === 'short' ? 0.5 : 1; // Set the default to 2 or adjust as needed
  const [userSelection, setUserSelection] = useState<string | null>(null);

  const handleYesNoChange = (value: string) => {
    // Handle changes when the user selects 'yes' or 'no'
    setUserSelection(value);
  };
//
//         console.log(data.length);
//         console.log(data.options);





    return <Stack key={data.id} mb={4} >
        <Typography variant="body1">{data.label}</Typography>
        <Box height={8}/>
        {data.type==='text'?[<TextField multiline minRows={fieldLength }  variant="outlined"  sx={{ flex: 1 }} />
//         <FormHelperText error>Please fill in valid values</FormHelperText>
        ]
        :data.type==='date'?[<DateField variant="standard" />]
        :data.type==='multi-select'?[<Select>
{(typedLists[data.options] ?? data.options)?.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}



                                     </Select>
]
        :data.type==='yes/no'?[ 
          <Box>
         <ToggleButtonGroup exclusive value={userSelection} onChange={(e, value) => handleYesNoChange(value)}>
    <ToggleButton value={'yes'}  sx={{ color: userSelection === 'yes' ? primary90: 'inherit' }}
>
      Yes
    </ToggleButton>
    <ToggleButton value={'no'} style={{ backgroundColor: userSelection === 'no' ? primary90 : 'inherit' }}>
      No
    </ToggleButton>
  </ToggleButtonGroup>

          {/* Additional fields based on user selection and condition */}
          {userSelection &&
            data.sub &&
            data.sub
              .filter((subField) => subField.condition.includes(userSelection))
              .map((subField, index) => (
                <FormFieldUI key={index} data={subField} register={register} control={control} />
              ))}
        </Box>
        ]
        :data.type==='checkbox'?[ 
          <Controller
          name="checkboxOptions"
          control={control}
          render={({ field }) => (
            <Box display="flex" flexWrap="wrap">
              {(typedLists[data.options] ?? data.options)?.map((v) => (
                <CardContent
                  key={v}
                  sx={{
                    margin: 1,
                    backgroundColor: field.value?.includes(v)? primary90 : OVA_very_soft_grey,
                    cursor: 'pointer',
                    borderRadius: 1,
                    height: 'auto',
                    width: 'auto',
                  }}
                  onClick={() => {
                    const updatedValues = field.value?.includes(v)
                      ? field.value?.filter((value) => value !== v)
                      : [...field.value??[], v];
                    field.onChange(updatedValues);
                  }}
                >
                  {v}
                </CardContent>
              ))}
            </Box>
          )}
        />
        ]

        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',min:0 }} />]
        :data.type==='address'?[<Input />,
        <FormHelperText error>Please fill in valid value</FormHelperText>]
        :data.type==='name'?[]
        :data.type==='populate'?[
          <Box>
          {
            data.group &&
            data.group
              .map((subField, index) => (
                <FormFieldUI key={index} data={subField} register={register} control={control} />
              ))}
           </Box>
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