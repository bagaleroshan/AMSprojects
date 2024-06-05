import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteStudentsMutation, useReadStudentsQuery } from "../../services/api/StudentService";
import TableComponent, { IData } from "./TableComponent";
import "./table.css";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const StudentTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Id", accessor: "_id" },
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Course", accessor: "course" },
    { Header: "Contact", accessor: "phoneNumber" },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data, isLoading, isError, refetch } = useReadStudentsQuery({
    ...query,
    sort: query.sort.join(","),
  });
  const [deleteStudents] = useDeleteStudentsMutation();

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
    navigate(`update`, {
      state: { updateStudentData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`View`, {
      state: { viewStudentData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };


 
  const handleDeleteClick= (selectedRowData: IData[])=>{
    console.log("Delete action triggered", selectedRowData);
      selectedRowData.forEach((value: IData) => {
      deleteStudents(value._id);
      console.log(value._id);
    });
  }

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

export default StudentTable;
