import { useNavigate } from "react-router-dom";
import CreateGroups from "./CreateGroups";
import GroupList from "./GroupList";

const Group = ({ secondTab }) => {
  const navigate = useNavigate();
  const onChangePage = (page) => {
    navigate("/admin/groups" + page);
  };

  return (
    <>
      {/* <Box height={10} /> */}
      {(secondTab === "groupList" && (
        <GroupList onChangePage={(page) => onChangePage(page)} />
      )) || <CreateGroups onChangePage={(page) => onChangePage(page)} />}
    </>
  );
};

export default Group;
