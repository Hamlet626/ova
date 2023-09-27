function NameInputs_Clinic({companyName,handleChange}){
const options = ["Company1", "Company2", "Company3"]; // Replace with your list of company names

  return (
  <form>
    <FormControl variant="standard" sx={{ minWidth: 400 }}>
      <InputLabel>Company Name</InputLabel>
      <Controller
        name="companyName"
        control={control}
        defaultValue=""
        rules={{ required: 'Company name is required' }}
        render={({ field }) => (
          <Select
            {...field}
            displayEmpty
            onChange={handleChange}
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
        )}
      />
      {errors.companyName && <span className="error-message">{errors.companyName.message}</span>}
    </FormControl>
    <button type="submit">Submit</button>
  </form>

  );
}


export function NameInputs_Clinic({ control, errors, trigger }) {
  return (
    <>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        }}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  {/* Add an icon for the first name */}
                </InputAdornment>
              }
              placeholder="First Name"
              type="text"
              onBlur={() => {
                trigger('firstName');
              }}
            />
            {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
          </div>
        )}
      />

      <Box width={23} />

      {/* Last Name Input */}
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        }}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  {/* Add an icon for the last name */}
                </InputAdornment>
              }
              placeholder="Last Name"
              type="text"
              onBlur={() => {
                trigger('lastName');
              }}
            />
            {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
          </div>
        )}
      />
    </>
  );
}
