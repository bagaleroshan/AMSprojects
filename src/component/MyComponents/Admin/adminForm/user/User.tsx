import { Box } from "@mui/material";
import UserList from "./UserList";
import CreateUser from "./CreateUsers";
import { useNavigate } from "react-router-dom";

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
      )) || <CreateUser onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default User;
