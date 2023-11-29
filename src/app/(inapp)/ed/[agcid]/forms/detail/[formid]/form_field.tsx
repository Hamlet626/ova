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
import {formatDate} from "@/utils/formatters";



export default function FormFieldUI({data,register,control,watch, name}:{data:FormField,register:any,control:any,watch:any,name:any }){
 
  const fieldLength = data.length === 'long' ? 3 : data.length === 'short' ? 0.5 : 1; // Set the default to 2 or adjust as needed

  //populate
 const [userSelection, setUserSelection] = useState<string | null>(null);

 const handleYesNoChange = (value: string) => {
  // Handle changes when the user selects 'yes' or 'no'
  setUserSelection(value);
};
  const { fields, append, remove } = useFieldArray({ control, name: 'group' });

//
        // console.log(data.length);
// const fieldValue = watch(data.id); // Replace 'data.id' with the actual ID of the field you want to watch
// console.log(fieldValue); // Log the value to the console

const addField = () => {
  if (data.group) {
    const newGroup = {
      group: data.group.map((subField) => ({
        ...subField,
        id: `${subField.id}.${uuidv4()}`, // Ensure unique IDs for each subField
      })),
    };
    console.log('New Group:', newGroup);

    append('group', newGroup); // Use the append method with the field name 'group'
  }
};



// const addField = () => {
//  append();
// };

const deleteGroup = (groupIndex) => {
  // Remove the group at the specified index
  remove(groupIndex);
};






    return <Stack key={data.id} mb={4} >
        <Typography variant="body1">
          {data.label}
          {data.type === 'populate' && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={addField}>
              <AddIcon />
            </IconButton>
       
          </Box>
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
          name={name || data.id} 
                    render={({ field }) => (
            <DatePicker
                value={formatDate (field.value)}
                onChange={(value) => {
                  field.onChange(formatDate(value));
                }}
              />
   
          )}
        />


        ] 
        :data.type==='multi-select'?[
        // <Select  {...register(data.id)}>
        // {(typedLists[data.options] ?? data.options)?.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)} 
        //                              </Select>
        <Controller
        name={name || data.id}        control={control}
        render={({ field }) => (
          <Select {...field}>
            {(typedLists[data.options] ?? data.options)?.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        )}
      />                           
]
        :data.type==='yes/no'?[ 
          <Box>
        <Controller
        name={data.id}
        control={control}
        render={({ field }) => (
          <ToggleButtonGroup
            name={data.id}
            exclusive
            value={field.value}
            onChange={(e, value) => {
              field.onChange(value);
              // handleYesNoChange(value);
            }}
          >
        <ToggleButton
  value={'yes'}
  sx={{
    backgroundColor: field.value?.includes('yes') ? primary90 : 'inherit',
  }}

>
  Yes
</ToggleButton>

            <ToggleButton
              value={'no'}
              sx={{bgcolor:primary90 }}
            >
              No
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />

          {/* Additional fields based on user selection and condition */}
          {/* {userSelection &&
            data.sub &&
            data.sub
              .filter((subField) => subField.condition.includes(userSelection))
              .map((subField, index) => (
                <Box sx={{marginLeft:"20px",marginTop: '10px'}}>
                <FormFieldUI key={index} data={subField} register={register} control={control} />
                </Box>
              ))} */}
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
//           <Box>
            
//             {fields.map((group, groupIndex) => {
//   return (
//     <Box key={group.id} sx={{ marginLeft: '20px', marginTop: '10px' }}>
//       <IconButton onClick={() => deleteGroup(groupIndex)}>
//         <DeleteIcon />
//       </IconButton>
//       {/* Display fields within the group if data.group is defined */}
//       {data.group && data.group.map((sub, subIndex) => (
//         <FormFieldUI data={sub} register={register} control={control} />
//       ))}
//       {/* Delete button for the entire group */}
//     </Box>
//   );
// })}
<Box>
  {fields.map((group, groupIndex) => (
    <Box key={group.id} sx={{ marginLeft: '20px', marginTop: '10px' }}>
      <IconButton onClick={() => deleteGroup(groupIndex)}>
        <DeleteIcon />
      </IconButton>
      {data.group && data.group.map((sub) => (
        <Controller
        name={`group.${groupIndex}.${sub.id}`}
        control={control}
        render={({ field }) => (
          <FormFieldUI
            data={sub}
            register={register}
            control={control}
            {...field} 
            name={`group.${groupIndex}.${sub.id}`} // Spread the field props into FormFieldUI
          />
        )}
      />
      ))}
    </Box>
  ))}
</Box>

//         </Box>
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
{data.sub &&
  data.sub
  .filter((subField) => {
    const watchedValue = watch(data.id);
    console.log(watchedValue);

    if (subField.condition) {
      // Check condition
      // console.log(subField.condition.some(condition => watchedValue?.includes(condition)));
      return subField.condition.some(condition => watchedValue?.includes(condition));
    } else if (subField.exCondition) {
      // Check exCondition
      console.log(!subField.exCondition.some(exCondition => watchedValue?.includes(exCondition)));

      return subField.exCondition.some(exCondition => !watchedValue?.includes(exCondition));
    }

    return true; // If no condition or exCondition, always render the subfield
  })
    // .filter((subField) => subField.condition?.some(condition => condition === watch(data.id)))
    .map((subField, index) => (
      <Box key={index} sx={{ marginLeft: '20px', marginTop: '10px' }}>
        <FormFieldUI
          data={subField}
          register={register}
          control={control}
          watch={watch}  
        />
      </Box>
    ))}



      {/* {renderSubfields(data.id)}
      {data.type === 'checkbox' && renderSubfields()} */}


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
