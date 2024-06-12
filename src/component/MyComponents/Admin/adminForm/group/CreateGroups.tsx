import { Box, Button } from "@mui/material";
import CreateGroup from "../../../../group/CreateGroup";

const CreateGroups = ({ onChangePage }) => {
  return (
    <>
      <Box height={10} />
      <div className="SubjectAddButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onChangePage("")}
        >
          Group List
        </Button>
      </div>
      <CreateGroup />
    </>
  );
};

export default CreateGroups;
