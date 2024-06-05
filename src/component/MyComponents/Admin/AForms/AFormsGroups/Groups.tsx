import { Box, Button, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ".././AFormsSubjects/Subject.css";

const Groups = () => {
  return (
    <>
      <Box height={10} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">Group List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button variant="contained" startIcon={<AddIcon />} color="secondary">
          Add
        </Button>
      </div>
    </>
  );
};

export default Groups;
