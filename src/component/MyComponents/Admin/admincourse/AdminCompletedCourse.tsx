import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";


const AdminCompletedCourse = () => {
  return (
    <>
      <Box
              margin={1}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Paper elevation={4} sx={{ borderRadius: "10px", mt: "2" }}>
                <Box sx={{ p: 2 }}>
                  <div className="TDashboardOngoingCourses">
                    <LocalLibraryOutlinedIcon
                      color="success"
                      fontSize="large"
                    />
                    <div className="TDashboardOngoingSubject">
                      <Typography gutterBottom variant="h6" color='primary'>
                        MERN - Full Stack MERN
                      </Typography>
                      <Box height={15} />
                      <Typography variant="body2" color='primary'>Group Name:</Typography>
                      <Typography variant="body1" color='primary'>Nitan.T_MERN_May_24_3_5_A1</Typography>
                    </div>
                    {/* <Button
                      variant="contained"
                      color="primary"
                    >
                      Take Attendance
                    </Button> */}
                    <Typography
                      variant="body1"
                      color='success'
                      sx={{ fontWeight: "normal", color:'green'}}
                    >
                      Present:0
                    </Typography>

                    <Typography
                      variant="body1"
                      color='error'
                      sx={{ fontWeight: "normal" }}
                    >
                      Absent:0
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                    >
                      Mark As Complete
                    </Button>

                  </div>
                </Box>
                <Box height={15} />
              </Paper>
            </Box>
    </>
  )
}

export default AdminCompletedCourse
