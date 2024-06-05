import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import StudentTable from "../../../../TableComponent/StudentTable";

const Student = () => {
  return (
    <>
      <Box height={10} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">Student List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button variant="contained" startIcon={<AddIcon />} color="secondary">
          Add
        </Button>
      </div>
      <StudentTable></StudentTable>
    </>
  );
};

export default Student;
