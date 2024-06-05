import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const UserList = ({onChangeUserPage}) => {
    
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">User List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={()=>onChangeUserPage('createUser')}>
          Add
        </Button>
      </div>
    </>
  );
};

export default UserList;
