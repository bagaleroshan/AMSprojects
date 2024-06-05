import { Box } from "@mui/material";
import UserList from "./UserList";
import { useState } from "react";
import CreateUser from "./CreateUser";

const User = () => {
  const [activeUserPage, setActiveUserPage] = useState("userList");
  return (
    <>
      <Box height={10} />
      {(activeUserPage === "userList" && (
        <UserList onChangeUserPage={(page) => setActiveUserPage(page)} />
      )) || <CreateUser onChangeUserPage={(page) => setActiveUserPage(page)} />}
    </>
  );
};

export default User;
