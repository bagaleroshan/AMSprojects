import React, { useState, useEffect } from "react";
import TableComponent, { IData } from "./TableComponent";
import "./table.css";
import { useNavigate } from "react-router-dom";
import { useReadStudentsQuery } from "../../services/api/StudentApi";
interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const StudentTable: React.FC = () => {
  const columns = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Course", accessor: "course" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phoneNumber" },
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

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }

  const useHandleEditClick = (selectedRowData: IData[]) => {
    const navigate = useNavigate();

    navigate(`/admin/forms/students/update/${selectedRowData[0]._id}`, {
      // state: { updateData: selectedRowData[0] },
      replace: true,
    });
    // return navigate(`/admin/forms/students/update/${selectedRowData[0].id}`, {
    //   replace: true,
    // });
  };
  return (
    <div>
      <h1>Student Table</h1>
      <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={useHandleEditClick}
      />
    </div>
  );
};

export default StudentTable;
