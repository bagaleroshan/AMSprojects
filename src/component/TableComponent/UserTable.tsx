import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUsersByIdMutation,
  useReadUsersQuery,
} from "../../services/api/UserService";
import TableComponent, { IData } from "./TableComponent";
import "./table.css";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const columns = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Contact", accessor: "phoneNumber" },
    { Header: "Role", accessor: "role" },
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

  const [deleteUsers] = useDeleteUsersByIdMutation();

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
    navigate(`/admin/forms/users/update/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/forms/users/${selectedRowData[0].id}`, {
      replace: true,
    });
    goBack();
  };

  const handleDeleteClick = async (selectedRowData: IData[]) => {
    for (const value of selectedRowData) {
      console.log(value.id);

      await deleteUsers(value.id).unwrap();
    }
    refetch();
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default UserTable;
