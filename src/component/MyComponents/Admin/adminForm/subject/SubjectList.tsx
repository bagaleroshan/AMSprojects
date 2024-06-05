import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import ShowAllSubjects from "../../../../subject/ShowAllSubjects";
// import SubjectTable from "../../../../ReactTable/Table";

const SubjectList = ({ onChangeSubjectPage }) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">Subject List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => onChangeSubjectPage("createSubject")}
        >
          Add
        </Button>
      </div>
      {/* <SubjectTable></SubjectTable> */}
      <ShowAllSubjects />
    </>
  );
};

export default SubjectList;
