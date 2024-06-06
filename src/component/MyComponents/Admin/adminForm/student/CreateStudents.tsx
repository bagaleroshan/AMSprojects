import { Box, Button, Typography } from "@mui/material";
import CreateSubject from "../../../../subject/CreateSubject";
import CreateStudent from "../../../../Student/CreateStudent";

const CreateStudents = ({ onChangePage }) => {
  return (
    <>
      <Box height={10} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("list")}
        >
          Student List
        </Button>
      </div>

      <CreateStudent />
    </>
  );
};

export default CreateStudents;
