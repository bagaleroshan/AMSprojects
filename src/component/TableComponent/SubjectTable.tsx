import React, { useState, useEffect } from "react";
import TableComponent, { IData } from "./TableComponent";
import "./table.css";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { useNavigate } from "react-router-dom";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const SubjectTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Id", accessor: "_id" },
    { Header: "Name", accessor: "subjectName" },
    { Header: "Code", accessor: "subjectCode" },
    { Header: "Classes", accessor: "numberOfClasses" },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data, isLoading, isError, refetch } = useReadSubjectsQuery({
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

  const handleEditClick = (selectedRowData: IData[]) => {
    navigate(`update`, {
      state: { updateData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`View`, {
      state: { viewData: selectedRowData[0] },
      replace: true,
    });
    console.log(selectedRowData);
  };

  return (
    <div>
      <h1>Subjects Table</h1>
      <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
      />
    </div>
  );
};

export default SubjectTable;
