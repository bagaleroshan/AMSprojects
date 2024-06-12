import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import GroupTable from "../../../../group/GroupTable";

const GroupList = ({ onChangePage }) => {
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
      <Box height={30} />
      <GroupTable />
    </>
  );
};

export default GroupList;
