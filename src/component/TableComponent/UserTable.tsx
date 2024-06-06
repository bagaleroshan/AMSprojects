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
  const columns = [
    { Header: "Id", accessor: "_id" },
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
    navigate(`users/update/${selectedRowData[0]._id}`, {
      state: { updateUserData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };

  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`View`, {
      state: { viewUserData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };

  const handleDeleteClick = async (selectedRowData: IData[]) => {
    console.log("Delete action triggered", selectedRowData);
    for (const value of selectedRowData) {
      await deleteUsers(value._id).unwrap();
      console.log(value._id);
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
