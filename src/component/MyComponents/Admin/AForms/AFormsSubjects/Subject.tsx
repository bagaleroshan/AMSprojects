import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import "./Subject.css";
import SubjectList from "./SubjectList";
import ACreateSubject from "./ACreateSubject";

const Subject = () => {
  const [activeSubjectPage, setActiveSubjectPage] = useState("subjectList");
  return (
    <>
      <Box height={10} />
      {(activeSubjectPage === "subjectList" && (
        <SubjectList onChangeSubjectPage={(page) => setActiveSubjectPage(page)} />
      )) || <ACreateSubject onChangeSubjectPage={(page) => setActiveSubjectPage(page)} />}
    </>
  );
};

export default Subject;
