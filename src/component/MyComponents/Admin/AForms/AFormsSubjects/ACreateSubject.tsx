import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from "@mui/material";

const ACreateSubject = ({onChangeSubjectPage}) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">Create Subject</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onChangeSubjectPage("subjectList")}
        >
          Subject List
        </Button>
      </div>
      <Box height={30} />
      <Stack
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
          <Button variant="contained" color="secondary">
            Submit
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ACreateSubject;
