import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateSubject from "./CreateSubjects";
import SubjectList from "./SubjectList";

const Subject = ({ secondTab }) => {
  // const [activeSubjectPage, setActiveSubjectPage] = useState("subjectList");
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/subjects" + page);
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
