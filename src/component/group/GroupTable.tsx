import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../muiModals/toastConfig";
import {
  useDeleteGroupMutation,
  useReadGroupQuery,
} from "../../services/api/GroupService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import TableComponent, { IData } from "../TableComponent/TableComponent";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const GroupTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Group Name", accessor: "groupName", width: "350px" },
    { Header: "Subject Name", accessor: "subject.subjectCode", width: "350px" },
    { Header: "Teacher Name", accessor: "teacher.fullName", width: "350px" },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data, isLoading, isError, refetch } = useReadGroupQuery({
    ...query,
    sort: query.sort.join(",") || "",
  });
  // console.log("***********************", data?.result?.results);
  const groupData = data?.result?.results;
  // console.log("groupData*********************", groupData);

  const [
    deleteGroups,
    {
      isError: isErrorDeletingGroup,
      error: errorDeleteGroup,
      isSuccess: isSuccessDeletingData,
      data: deleteGroupData,
    },
  ] = useDeleteGroupMutation();

  useEffect(() => {
    if (isErrorDeletingGroup) {
      if (isFetchBaseQueryError(errorDeleteGroup)) {
        toast.error(getErrorMessage(errorDeleteGroup), { autoClose: 5000 });
      } else if (isSerializedError(errorDeleteGroup)) {
        toast.error(errorDeleteGroup?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorDeletingGroup, errorDeleteGroup]);

  useEffect(() => {
    if (isSuccessDeletingData) {
      showSuccessToast(deleteGroupData.message);
    }
  }, [isSuccessDeletingData, deleteGroupData]);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }

  const handleGroupEditClick = (selectedRowData: IData[]) => {
    navigate(`/admin/groups/update/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleDeleteClick = (selectedRowData: IData[]) => {
    selectedRowData.forEach((value: IData) => {
      deleteGroups(value.id);
      refetch();
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/groups/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const fileName = "Group File";
  return (
    <div>
      {/* <GroupExportCSV
        data={data.result.results}
        fileName="Group File"
      ></GroupExportCSV> */}
      <TableComponent
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
      />
    </div>
  );
};

export default GroupTable;
