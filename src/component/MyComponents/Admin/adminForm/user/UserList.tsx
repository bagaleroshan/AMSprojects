import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import UserTable from "../../../../TableComponent/UserTable";

const UserList = ({onChangeUserPage}) => {
    
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">User List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={()=>onChangeUserPage('createUser')}>
          Add
        </Button>
      </div>
      <UserTable></UserTable>
    </>
  );
};

export default UserList;
