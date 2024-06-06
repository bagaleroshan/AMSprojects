import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import StudentTable from "../../../../TableComponent/StudentTable";
const StudentList = ({ onChangePage }) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2>Student List</h2>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => onChangePage("create")}
        >
          Add
        </Button>
      </div>
      <StudentTable/>
     
    </>
  );
};

export default StudentList;
