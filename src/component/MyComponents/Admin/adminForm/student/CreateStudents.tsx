import { Box, Button } from "@mui/material";
import CreateStudent from "../../../../Student/CreateStudent";

const CreateStudents = ({ onChangePage }) => {
  return (
    <>
      <Box height={10} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("")}
        >
          Student List
        </Button>
      </div>

      <CreateStudent />
    </>
  );
};

export default CreateStudents;
