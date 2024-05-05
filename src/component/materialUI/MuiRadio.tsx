import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useState } from 'react'

const MuiRadio = () => {
    const [value, setValue] = useState("")
    console.log(value)

    const handleChange = (e: any) =>{
        setValue(e.target.value)
    }

  return (
    <Box>
        <FormControl>
            <FormLabel id='job-experience-group-label'>
                Years of Experience
            </FormLabel>
            <RadioGroup
                name='job-experience-group'
                aria-labelledby='job-experience-group-label'
                value={value}
                onChange={handleChange}
                row
                >
                    <FormControlLabel control={<Radio size='medium' color='secondary'/>} label ="0-2" value="0-2" />
                    <FormControlLabel control={<Radio size='small'/>} label ="2-4" value="2-4" />
                    <FormControlLabel control={<Radio size='large'/>} label ="4-6" value="4-6" />
            </RadioGroup>
        </FormControl>
    </Box>
  )
}

export default MuiRadio