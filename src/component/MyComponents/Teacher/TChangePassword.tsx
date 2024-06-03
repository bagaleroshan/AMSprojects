import { Box, Typography } from '@mui/material'
import React from 'react'
import TeacherSideBar from './TeacherSideBar'
import '../Style.css/TChangePassword.css'

const TChangePassword = () => {
  return (
    <>
    <div className='tChangePassword'>
      <Box sx={{display:'flex'}}>
      <TeacherSideBar></TeacherSideBar>
      <Box component="main" sx={{flexGrow:1, p:3}}>
        <Box height={60}/>
        <Typography variant="h2">Teacher ChangePassword</Typography>
      </Box>
      </Box>
    </div>
    </>
  )
}

export default TChangePassword
