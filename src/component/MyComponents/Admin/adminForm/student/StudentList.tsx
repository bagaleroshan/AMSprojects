import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import StudentTable from "../../../../Student/StudentTable";

const StudentList = ({ onChangePage }) => {
  return (
    <>
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => onChangePage("/create")}
        >
          Add
        </Button>
      </div>
      <Box height={60} />
      <StudentTable />
    </>
  );
};

export default StudentList;
