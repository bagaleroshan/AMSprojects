import { Box, Typography } from '@mui/material'
import React from 'react'
import TeacherSideBar from './TeacherSideBar'
import '../Style.css/TLogout.css'

const TLogout = () => {
  return (
    <>
    <div className='TLogout'>
      <Box sx={{display:'flex'}}>
        <TeacherSideBar></TeacherSideBar>
        <Box component="main" sx={{FlexGrow:1, p:3}}>
          <Box height={60}/>
          <Typography variant="h2">TeacherLogout</Typography>
        </Box>
      </Box>
    </div>
    </>
  )
}

export default TLogout
