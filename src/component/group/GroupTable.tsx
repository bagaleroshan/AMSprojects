import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../muiModals/toastConfig";
import {
  useDeleteGroupMutation,
  useReadGroupQuery,
} from "../../services/api/GroupService";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import TableComponent from "../TableComponent/TableComponent";
import { IData, Query } from "../interfaces/TableInterface";
import CustomDialog from "../../DeleteConfirmation";

const GroupTable: React.FC = () => {
  const navigate = useNavigate();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const columns = [
    {
      Header: "Group Name",
      accessor: "groupName",
      Cell: (row) => <span>{changeFirstName(row.value)}</span>,
      width: "350px",
    },
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
    setSelectedStudentIds(selectedRowData.map((value: IData) => value.id));
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    selectedStudentIds.forEach((val) => {
      // console.log("val**************", val);
      deleteGroups(val);
    });

    setOpenDeleteConfirmation(false);
    setSelectedStudentIds([]);
    refetch();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedStudentIds([]);
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
      {openDeleteConfirmation && (
        <CustomDialog
          open={openDeleteConfirmation}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default GroupTable;
