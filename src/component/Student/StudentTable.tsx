import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useReadStudentsQuery,
} from "../../services/api/StudentApi";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import StudentExportCSV from "../ExportCSV/StudentExportCSV";
import DeleteConfirmation from "../../DeleteConfirmation";
interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}
const StudentTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
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
  const [deleteStudents] = useDeleteStudentMutation();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  useEffect(() => {
    refetch();
  }, [query, refetch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }
  const handleStudentEditClick = (selectedRowData: IData[]) => {
    navigate(`/admin/students/update/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/students/${selectedRowData[0].id}`, {
      replace: true,
    });
  };
  const handleDeleteClick = (selectedRowData: IData[]) => {
    setSelectedStudentIds(selectedRowData.map((value: IData) => value.id));
    setOpenDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await Promise.all(selectedStudentIds.map((id) => deleteStudents(id)));
    setOpenDeleteConfirmation(false);
    setSelectedStudentIds([]);
    refetch();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirmation(false);
    setSelectedStudentIds([]);
  };
  return (
    <div>
      <StudentExportCSV
        data={data.result.results}
        fileName="Student File"
      ></StudentExportCSV>
      <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleStudentEditClick}
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
export default StudentTable;

