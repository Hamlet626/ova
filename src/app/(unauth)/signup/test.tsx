function NameInputs_Clinic({companyName,handleChange}){
const options = ["Company1", "Company2", "Company3"]; // Replace with your list of company names

  return (
  <div>
  <FormControl variant="standard" sx={{  minWidth: 400 }}>
        <InputLabel >Aghe</InputLabel>

          <Select

            value={companyName}
            onChange={handleChange}
             placeholder="Company Name"
          type="text"
          startAdornment={
             <InputAdornment position="start">
               <BusinessOutlinedIcon />
             </InputAdornment>
           }
          >
 <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
          </Select>
        </FormControl>
       </div>

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
            <FormHelperText error>{errors.firstname}</FormHelperText>

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

         <FormHelperText error>{errors.lastname}</FormHelperText>
    </Box>
  );
}
