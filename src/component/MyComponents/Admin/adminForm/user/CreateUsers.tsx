import { Button } from "@mui/material";
import CreateUser from "../../../../user/CreateUser";

const CreateUsers = ({ onChangePage }) => {
  return (
    <>
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("")}
        >
          User List
        </Button>
      </div>

      {/* <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>FirstName*</label>
          <br></br>
          <TextField
            placeholder="Enter User Full Name"
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </Box>
        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>Email*</label>
          <br></br>
          <TextField
            placeholder="Enter User Email"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </Box>

        <Box sx={{ width: "300px", m: 1, textAlign: "center" }}>
          <label>Role*</label>
          <br></br>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Admin"
                control={<Radio color="secondary" />}
                label="Admin"
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio color="secondary" />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ width: "200px", m: 1, textAlign: "center" }}>
          <label>Action</label>
          <br></br>
          <Button variant="outlined" color="error">
            Delete
          </Button>
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
          <Button variant="contained" color="success">
            Add More
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </Stack> */}
      <CreateUser />
    </>
  );
};

export default CreateUsers;
