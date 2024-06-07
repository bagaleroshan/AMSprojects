import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserTable from "../../../../TableComponent/UserTable";

const UserList = ({ onChangePage }) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5">User List</Typography>
      </div>
      <Box height={30} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => onChangePage("/create")}
        >
          Add
        </Button>
      </div>
      <UserTable></UserTable>
    </>
  );
};

export default UserList;
