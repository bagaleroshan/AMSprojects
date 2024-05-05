import { Box, MenuItem, TextField } from "@mui/material"
import React, { useState } from "react"

const MuiSelect = () => {
    let [country, setCountry] = useState("")
    // console.log(country)


    /* Multiselect */
    let [countries, setCountries] = useState<string[]>([])
    // console.log(countries)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        setCountries(typeof value === "string"? value.split(','): value)
    }

  return (
    <div>
        {/* Box is just a plain div tag with width */}
        <Box width='250px'>
            <TextField
                label="Select Country"
                select
                fullWidth
                value={country}
                onChange={e=>setCountry(e.target.value as string)}
                size="small"
                color="secondary"
                helperText="Please select your country">
            {/* MenuItem is used for options */}
                <MenuItem value="Nepal">Nepal</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="US">US</MenuItem>
            </TextField>
        </Box>
        <br></br>
        {/* Multiselect */}
        <Box width='250px'>
            <TextField
                label="Select Multiple Countries"
                select
                fullWidth
                value={countries}
                onChange={handleChange}>
            {/* MenuItem is used for options */}
                <MenuItem value="Nepal">Nepal</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="US">US</MenuItem>
            </TextField>
        </Box>
    </div>
  )
}

export default MuiSelect