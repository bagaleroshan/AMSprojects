import { InputAdornment, Stack, TextField } from '@mui/material'
import { useState } from 'react'

const TextFieldMUI = () => {


  let [value, setValue] = useState("")
  return (
    <div>
        <Stack>
        <Stack direction='row' spacing={2}>
          <TextField label= "Name" variant='outlined'></TextField>
          <TextField label= "Name" variant='filled'></TextField>
          <TextField label= "Name" variant='standard'></TextField>
        </Stack>
        <Stack direction='row' spacing={2}>
          <TextField label= "Name" size='small' color='secondary'></TextField>

          <TextField label= "Read Only" variant='filled' required
          InputProps={{readOnly: true}}></TextField>

          <TextField label= "Password" variant='standard'
          helperText="Do not share your password with anyone"></TextField>
        </Stack>

        <Stack direction='row' spacing={2}>
          <TextField label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position='start'>Rs.</InputAdornment>
          }}>
          </TextField>
          <TextField label="Amount"
          InputProps={{
            endAdornment: <InputAdornment position='end'>kg</InputAdornment>
          }}>
          </TextField>
          <TextField label="Form Input" value={value} required error={!value}
          helperText={!value? "Required" : "Do not change password"}
          onChange={e=> setValue(e.target.value)} />
        </Stack>
        </Stack>
    </div>
  )
}

export default TextFieldMUI