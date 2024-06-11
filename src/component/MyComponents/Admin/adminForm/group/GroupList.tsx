import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

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
      
     
    </>
  );
};

export default GroupList;
