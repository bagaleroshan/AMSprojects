import { Button, ButtonGroup, Stack } from '@mui/material'
import React from 'react'

const MuiBUtton = () => {

    
  return (
    <div>
        <Stack>
            <ButtonGroup>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => alert("Button Submitted")}
                  >Submit
                  </Button>
            </ButtonGroup>
        </Stack>
    </div>
  )
}

export default MuiBUtton