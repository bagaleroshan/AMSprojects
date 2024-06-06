import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";
import ShowAllSubjects from "../../../../subject/ShowAllSubjects";

const SubjectList = ({ onChangePage }) => {
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
          onClick={() => onChangePage("create")}
        >
          Add
        </Button>
      </div>
      <ShowAllSubjects/>
    </>
  );
};

export default SubjectList;
