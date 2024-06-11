import { Button } from "@mui/material";
import CreateUser from "../../../../user/CreateUser";

const CreateUsers = ({ onChangePage }) => {
  return (
    <>
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("")}
        >
          User List
        </Button>
      </div>
      <CreateUser />
    </>
  );
};

export default CreateUsers;
