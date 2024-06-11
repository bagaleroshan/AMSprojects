import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import CreateUsers from "./CreateUsers";

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
      )) || <CreateUsers onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default User;
