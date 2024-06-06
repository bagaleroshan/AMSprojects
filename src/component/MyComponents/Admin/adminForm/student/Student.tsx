import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateStudents from "./CreateStudents";
import StudentList from "./StudentList";

const Student = ({ secondTab }) => {
  // const [activeSubjectPage, setActiveSubjectPage] = useState("subjectList");
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/students/" + page);
  };

  return (
    <>
      <Box height={10} />
      {(secondTab === "studentList" && (
        <StudentList onChangePage={(page) => onChangePage(page)} />
      )) || <CreateStudents onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default Student;
