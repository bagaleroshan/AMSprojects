import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TeacherSideBar from "./TeacherSideBar";
import "../Style.css/TMessages.css";

const TMessages = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className="teacherMessages">
        <Box sx={{ display: "flex" }}>
          <TeacherSideBar></TeacherSideBar>
          <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
            <Box height={60} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Send Messages
            </Typography>
            <Box height={60} />
            {/* <Stack display="flex" direction="row" > */}
            <Card >
              <CardContent sx={{width:'1100px', margin:'auto'}}>
                <Box height={40}/>
                <div className="fieldRow">
                  <Typography variant="body2">Group<span className="TMastrick">*</span></Typography>
                  <FormControl sx={{ m: 1, width: "300px" }} size="small"  required>
                    <Select value={age} onChange={handleChange} displayEmpty required>
                      <MenuItem value="">
                        <em>--Choose Group</em>
                      </MenuItem>
                      <MenuItem value={10}>Addition Report Filters</MenuItem>
                      <MenuItem value={20}>Nitan D1</MenuItem>
                      <MenuItem value={30}>Nitan E1</MenuItem>
                      <MenuItem value={30}>Nitan E12</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="body2">Student Name <span className="TMastrick">*</span></Typography>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="filled"
                    size="small"
                    sx={{ width: "300px" }}
                  />

                  {/* </Stack> */}
                </div>
                <Box height={40} />
                <div className="TMbutton">
                  <Button variant="contained" color="secondary">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TMessages;
