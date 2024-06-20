import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUsersByIdMutation,
  useReadUsersQuery,
} from "../../services/api/UserService";

import UserExportCSV from "../ExportCSV/UserExportCSV";

import DeleteConfirmation from "../../DeleteConfirmation";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Name", accessor: "fullName", width: "350px" },
    { Header: "Email", accessor: "email", width: "350px" },
    {
      Header: "Contact",
      accessor: "phoneNumber",
      width: "350px",
    },
    { Header: "Role", accessor: "role", width: "350px" },
    { Header: "Hello", accessor: "hello", width: "350px" },
    { Header: "World", accessor: "world", width: "350px" },
    {
      Header: "Science",
      accessor: "science",
      width: "350px",
    },
    { Header: "Math", accessor: "math", width: "350px" },
    { Header: "Social", accessor: "social", width: "350px" },
    {
      Header: "Physics",
      accessor: "physics",
      width: "350px",
    },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data, isLoading, isError, refetch } = useReadUsersQuery({
    ...query,
    sort: query.sort.join(","),
  });

  const [
    deleteUsers,
    {
      isError: isDeleteUserError,
      isSuccess: isDeletedUserSuccessfully,
      error: errorDeleteUser,
      data: isDeleteData,
    },
  ] = useDeleteUsersByIdMutation();

  useEffect(() => {
    if (isDeleteUserError) {
      if (isFetchBaseQueryError(errorDeleteUser)) {
        toast.error(getErrorMessage(errorDeleteUser), { autoClose: 5000 });
      } else if (isSerializedError(errorDeleteUser)) {
        toast.error(errorDeleteUser?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isDeleteUserError, errorDeleteUser]);

  useEffect(() => {
    if (isDeletedUserSuccessfully) {
      toast.success(isDeleteData.message, {
        autoClose: 3000,
      });
    }
  }, [isDeletedUserSuccessfully, isDeleteData]);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }

  const handleEditClick = (selectedRowData: IData[]) => {
    navigate(`/admin/users/update/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/users/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleDeleteClick = (selectedRowData: IData[]) => {
    setSelectedUserIds(selectedRowData.map((value: IData) => value.id));
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await Promise.all(selectedUserIds.map((id) => deleteUsers(id)));
    setOpenDeleteConfirmation(false);
    setSelectedUserIds([]);
    refetch();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedUserIds([]);
  };
  const fileName="User File"
  return (
    <div>
      {/* <UserExportCSV
        data={data.result.results}
        fileName="User File"
      ></UserExportCSV> */}
      <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
        fileName={fileName}
      />

      {openDeleteConfirmation && (
        <DeleteConfirmation
          open={openDeleteConfirmation}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserTable;
