import { FormField } from "@/utils/form/types";
import { Box, FormHelperText, Input, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
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

import { useFieldArray } from 'react-hook-form';
import {IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';



export default function FormFieldUI({data,register,control}:{data:FormField,register:any,control:any }){
 
  const fieldLength = data.length === 'long' ? 3 : data.length === 'short' ? 0.5 : 1; // Set the default to 2 or adjust as needed
  const formatDate = (dateObject) => {
    if (!dateObject || !dateObject.$d) return null;

      const dateToFormat = dayjs(dateObject.$d);
  
    return dateToFormat.format('MM/DD/YYYY');
  };
  //populate
  const [userSelection, setUserSelection] = useState<string | null>(null);

  const handleYesNoChange = (value: string) => {
    // Handle changes when the user selects 'yes' or 'no'
    setUserSelection(value);
  };
  const { fields, append, remove } = useFieldArray({ control, name: 'group' });

//
//         console.log(data.length);
//         console.log(data.options);


const addField = () => {
  if (data.group) {
    const newFields = data.group.map((subField) => ({
      ...subField,
      id: `group.${uuidv4()}`, // Generate a unique ID for each subfield
    }));
    append(newFields);
  }
};


const deleteSet = (setId) => {
  const setIndex = fields.findIndex((subField) => subField.id === setId);
  if (setIndex !== -1) {
    remove(setIndex);
  }
};
const handleCheckboxChange = (value) => {
  // Handle changes when the user selects a checkbox
  // Append the selected checkbox value to userSelection
  setUserSelection((prevSelection) => {
    const updatedSelection = [...(prevSelection || []), value];
    return updatedSelection;
  });
};
const renderSubfields = () => {
  console.log("Rendering subfields for", data.label);
  console.log("User selection:", userSelection);
  console.log("Subfields:", data.sub);

  if (data.sub && data.sub[data.id] && userSelection) {
    const subData = data.sub[data.id];
    return fields.map((subField, index) => {
      const shouldRenderSubField =
        subData.condition && subData.condition.some((condition) => userSelection.includes(condition));
      return shouldRenderSubField ? (
        <Box key={subField.id} sx={{ marginLeft: '20px', marginTop: '10px' }}>
          <FormFieldUI data={subField} register={register} control={control} />
        </Box>
      ) : null;
    });
  }
  return null;
};




    return <Stack key={data.id} mb={4} >
        <Typography variant="body1">
          {data.label}
          {data.type === 'populate' && (
          <IconButton onClick={addField}>
            <AddIcon />
          </IconButton>
  
        )}
        </Typography>
        <Box height={8}/>
        {data.type==='text'?[<TextField multiline minRows={fieldLength }  variant="outlined"  sx={{ flex: 1 }}  {...register(data.id)} />
//         <FormHelperText error>Please fill in valid values</FormHelperText>
        ]
        :data.type==='date'?[
          // < DatePicker label="Basic date picker" format="DD/MM/YYYY"  {...(data.id && register(data.id)?.onChange && register(data.id).onChange)} /> 
          <Controller
          control={control}
          name={data.id}
          render={({ field }) => (
            <Box>
            <DatePicker
                value={formatDate (field.value)}
                onChange={(value) => {
                  field.onChange(formatDate(value));
                }}
              />
            </Box>
          )}
        />


        ] 
        :data.type==='multi-select'?[<Select {...register(data.id)}>
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
                <Box sx={{marginLeft:"20px",marginTop: '10px'}}>
                <FormFieldUI key={index} data={subField} register={register} control={control} />
                </Box>
              ))}
        </Box>
        ]
        :data.type==='checkbox'?[ 
          <Controller
          name={data.id}
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

        :data.type==='number'?[<TextField type='number' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',min:0 }} {...register(data.id)}/>]
        :data.type==='address'?[<Input {...register(data.id)}/>,
        <FormHelperText error>Please fill in valid value</FormHelperText> ]
        :data.type==='name'?[]
        :data.type==='populate'?[
          <Box>
        {fields.map((subField, index) => (
            <div key={subField.id}>
              <IconButton onClick={() => remove(subField.id)}>
                <DeleteIcon />
              </IconButton>
              <Box sx={{ marginLeft: '20px', marginTop: '10px' }}>
                {/* Use register to connect the field to React Hook Form */}
                <FormFieldUI data={subField} register={register} control={control} />
              </Box>
            </div>
          ))}
          </Box>
          // <Box>
          // {
          //   data.group &&
          //   data.group
          //     .map((subField, index) => (
          //       <Box sx={{marginLeft:"20px",marginTop: '10px'}}>
          //       <FormFieldUI key={index} data={subField} register={register} control={control} />
          //       </Box>
          //     ))}
          //  </Box>
        ]
        :[]
  }
{userSelection &&
        data.sub &&
        data.sub
          .filter((subField) => subField.condition.includes(userSelection))
          .map((subField, index) => (
            <Box key={index} sx={{ marginLeft: '20px', marginTop: '10px' }}>
              <FormFieldUI
                data={subField}
                register={register}
                control={control}
              />
            </Box>
          ))}
      {renderSubfields(data.id)}
      {data.type === 'checkbox' && renderSubfields()}


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
