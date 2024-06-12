import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import UserTable from "../../../../teacher/UserTable";

const UserList = ({ onChangePage }) => {
  return (
    <>
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
      <Box height={15} />
      <UserTable></UserTable>
    </>
  );
};

export default UserList;
