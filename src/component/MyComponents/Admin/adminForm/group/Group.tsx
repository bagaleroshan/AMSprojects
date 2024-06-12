import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupList from "./GroupList";
import CreateGroups from "./CreateGroups";

const Group = ({ secondTab }) => {
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/group" + page);
  };

  return (
    <>
      <Box height={10} />
      {(secondTab === "groupList" && (
        <GroupList onChangePage={(page) => onChangePage(page)} />
      )) || <CreateGroups onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default Group;
