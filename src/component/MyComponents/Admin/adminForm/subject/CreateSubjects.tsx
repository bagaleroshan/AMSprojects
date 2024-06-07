import { Box, Button, Typography } from "@mui/material";
import CreateSubject from "../../../../subject/CreateSubject";

const CreateSubjects = ({ onChangePage }) => {
  return (
    <>
      {/* <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">Create Subject</Typography>
      </div> */}
      <Box height={10} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("list")}
        >
          Subject List
        </Button>
      </div>
      {/* <Box height={10} /> */}
      {/* <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>Name*</label>
          <br></br>
          <TextField
            placeholder="Enter Subject Name"
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </Box>
        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>Code*</label>
          <br></br>
          <TextField
            placeholder="Enter Code"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </Box>

        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>Number of Classes*</label>
          <br></br>
          <TextField
            placeholder="Enter Number of Classes"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </Box>
      </Stack>
      <Box height={30} />
      <Stack
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Stack display="flex" direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </Stack> */}
      <CreateSubject />
    </>
  );
};

export default CreateSubjects;
