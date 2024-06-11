import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSubjectMutation,
  useReadSubjectsQuery,
} from "../../services/api/SubjectService";
import SubjectExportCSV from "../ExportCSV/SubjectExportCSV";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import DeleteConfirmation from "../../DeleteConfirmation";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const ShowAllSubjects: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
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

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
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
    navigate(`/admin/forms/subjects/update/${selectedRowData[0].id}`, {
      state: { updateData: selectedRowData[0] },
      replace: true,
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/forms/subjects/${selectedRowData[0].id}`, {
      // state: { viewData: selectedRowData[0] },
      replace: true,
    });
  };

  const handleDeleteClick = (selectedRowData: IData[]) => {
    setSelectedSubjectIds(selectedRowData.map((value: IData) => value.id));
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await Promise.all(selectedSubjectIds.map((id) => deleteSubject(id)));
    setOpenDeleteConfirmation(false);
    setSelectedSubjectIds([]);
    refetch();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedSubjectIds([]);
  };
  return (
    <div>
      <SubjectExportCSV
        data={data.result.results}
        fileName="Subject File"
      ></SubjectExportCSV>

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

export default ShowAllSubjects;
