import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSubjectMutation,
  useReadSubjectsQuery,
} from "../../services/api/SubjectService";
import TableComponent, { IData } from "../TableComponent/TableComponent";
// import AdminTabs from "../MyComponents/Admin/adminForm/AdminTabs";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const ShowAllSubjects: React.FC = () => {
  console.log("jenis");
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
  const [deleteSubject] = useDeleteSubjectMutation();

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
    navigate(`/admin/forms/subjects/update/${selectedRowData[0]._id}`, {
      // state: { updateData: selectedRowData[0] },
      replace: true,
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/forms/subjects/${selectedRowData[0]._id}`, {
      // state: { viewData: selectedRowData[0] },
      replace: true,
    });
  };

  const handleDeleteClick = (selectedRowData: IData[]) => {
    console.log("Delete action triggered", selectedRowData);
    selectedRowData.forEach((value: IData) => {
      deleteSubject(value._id);
    });
  };

  return (
    <div>
      {/* <AdminTabs onTabChange={(tab) => setActiveTab(tab)} /> */}
      <h1>Subjects List</h1>
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

export default ShowAllSubjects;
