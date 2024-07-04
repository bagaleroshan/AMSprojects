import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useReadGroupByIdQuery } from "../services/api/GroupService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../utils/utils";

const AdminGroupReport: React.FC = ({ groupId }) => {
  console.log("groupId-----", groupId);
  const columns = [
    { Header: "Group Name", accessor: "groupName", width: "350px" },
    { Header: "Subject Name", accessor: "subject.subjectCode", width: "350px" },
    { Header: "Teacher Name", accessor: "teacher.fullName", width: "350px" },
  ];

  const {
    data: dataReadGroupById,
    isLoading: isLoadingDataReadGroupsById,
    isError: isErrorDataReadGroupsById,
    error: errorReadGroupsById,
    refetch,
  } = useReadGroupByIdQuery(groupId, { skip: !groupId });

  const groupData = dataReadGroupById?.result;
  console.log("groupBy  Jnie Id Data*********************", groupData);

  // const specificGroup = useMemo(() =>{
  //   return specificGroup.map((value) => )
  // });

  useEffect(() => {
    isErrorDataReadGroupsById &&
      (isFetchBaseQueryError(errorReadGroupsById)
        ? toast.error(getErrorMessage(errorReadGroupsById))
        : isSerializedError(errorReadGroupsById)
        ? toast.error(errorReadGroupsById?.message)
        : "Unknown Error");
  }, [isErrorDataReadGroupsById, errorReadGroupsById]);

  useEffect(() => {
    if (groupId) {
      refetch();
    }
  }, [groupId, refetch]);

  if (isLoadingDataReadGroupsById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <GroupExportCSV
        data={data.result.results}
        fileName="Group File"
      ></GroupExportCSV> */}
      {/* <TableComponent
        columns={columns}
        data={groupData}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleGroupEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
        fileName={fileName}
      /> */}
      Table Table
    </div>
  );
};

export default AdminGroupReport;
