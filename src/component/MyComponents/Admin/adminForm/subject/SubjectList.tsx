import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShowAllSubjects from "../../../../subject/ShowAllSubjects";
const SubjectList = ({ onChangePage }) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        {/* <Typography variant="h4" sx={{fontWeight:'1200px'}}>Subject List</Typography> */}
        {/* <h2>Subject List</h2> */}
      </div>
      {/* <Box height={30} /> */}
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
      <Box height={30}/>
      <ShowAllSubjects/>
    </>
  );
};

export default SubjectList;
