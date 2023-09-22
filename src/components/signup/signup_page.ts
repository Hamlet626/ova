import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Bg1 } from "@/components/background/bg1";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Google, Lock, Login, Mail, Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import {font2} from "@/components/ThemeRegistry/theme_consts";
import {font2} from "@/components/ThemeRegistry/theme_consts";

import { getClinic } from "@/utils/clinic_check";
import { useUrl } from 'nextjs-current-url';
import { useSearchParams } from 'next/navigation'
import { useFormControl, TextField, FormHelperText} from '@mui/material';

const flexContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
function NameInputs_Clinic(){
return (
<Input
        name="Company Name"
        fullWidth
        startAdornment={
                <InputAdornment position="start">
                   <BusinessOutlinedIcon/>
                </InputAdornment>
                  }
        placeholder="Company Name"
        type="text"
      />
      );
      }

function NameInputs_NotClinic({ formData, handleInputChange, errors }) {
  return (
    <Box sx={flexContainerStyle}>
      <Input
        name="firstname"
        fullWidth
        startAdornment={<InputAdornment position="start"></InputAdornment>}
        placeholder="First Name"
        type="text"
        value={formData.firstname}
        onChange={handleInputChange}
       error={!!errors.firstname}
      />
      {errors.firstname && (
            <FormHelperText error>{errors.firstname}</FormHelperText>
                   )}

      <Box width={23} />
      <Input
        name="lastname"
        fullWidth
        startAdornment={<InputAdornment position="start"></InputAdornment>}
        placeholder="Last Name"
        type="text"
      value={formData.lastname}
             onChange={handleInputChange}
            error={!!errors.lastname}
           />
           {errors.lastname && (
         <FormHelperText error>{errors.lastname}</FormHelperText>
          )}
    </Box>
  );
}