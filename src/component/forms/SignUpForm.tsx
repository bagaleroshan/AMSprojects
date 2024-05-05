import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

const SignUpForm = () => {

  let [country, setCountry] = useState("")
  console.log(country)

  const [gender, setGender] = useState("")
    console.log(gender)

    const handleRadio = (e: any) =>{
        setGender(e.target.value)
    }
  return (
    <div>
        <Typography variant="h4" align="center">Sign-Up Form</Typography>
        <Stack direction='column' spacing={2}>
          <TextField label= "Full Name" size='small' value={fullName} />
          <TextField label= "Email"  size='small' value={email}/>
          <TextField label= "Password" size='small' value={password} />
        </Stack>

        <Stack>

        </Stack>

        <Stack>
        <Box>
        <FormControl>
            <FormLabel id='ender-group-label'>
                Gender :
            </FormLabel>
            <RadioGroup
                name='gender-group'
                aria-labelledby='gender-group-label'
                value={gender}
                onChange={handleRadio}
                row
                >
                    <FormControlLabel control={<Radio size='small'/>} label ="Male" value="male" />
                    <FormControlLabel control={<Radio size='small'/>} label ="Female" value="female" />
                    <FormControlLabel control={<Radio size='small'/>} label ="Others" value="others" />
            </RadioGroup>
        </FormControl>
        </Box>
        </Stack>

        <Stack>
            <ButtonGroup>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => alert("Button Submitted")}
                  >Submit</Button>
            </ButtonGroup>
        </Stack>
    </div>
  )
}

export default SignUpForm