import { Box } from "@mui/material";
import { useState } from "react";
import ACreateSubject from "./CreateSubjects";
import "./Subject.css";
import SubjectList from "./SubjectList";
import { useNavigate } from "react-router-dom";
import CreateSubject from "./CreateSubjects";

const Subject = ({ secondTab }) => {
  // const [activeSubjectPage, setActiveSubjectPage] = useState("subjectList");
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/subjects/" + page);
  };

  return (
    <>
      <Box height={10} />
      {(secondTab === "subjectList" && (
        <SubjectList onChangePage={(page) => onChangePage(page)} />
      )) || <CreateSubject onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default Subject;
