import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateTeacher from "../../../Teacher/CreateTeacher";
import UserList from "./UserList";

const User = ({ secondTab }) => {
  // const [activeUserPage, setActiveUserPage] = useState("userList");
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/users" + page);
  };

  return (
    <>
      <Box height={10} />
      {(secondTab === "userList" && (
        <UserList onChangePage={(page) => onChangePage(page)} />
      )) || <CreateTeacher onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default User;
