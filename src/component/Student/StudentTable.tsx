import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useReadStudentsQuery,
} from "../../services/api/StudentApi";
import TableComponent, { IData } from "../TableComponent/TableComponent";

import DeleteConfirmation from "../../DeleteConfirmation";
import StudentExportCSV from "../ExportCSV/StudentExportCSV";
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
const StudentTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Name", accessor: "fullName", fixedWidth: "350px" },
    { Header: "Email", accessor: "email", fixedWidth: "350px" },
    { Header: "Contact", accessor: "phoneNumber", fixedwidth: "350px" },
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
  const [
    deleteStudents,
    {
      isError: isDeleteStudentError,
      error: errorDeleteStudent,
      isSuccess: isSuccessDeleteStudent,
      data: successDeleteStudent,
    },
  ] = useDeleteStudentMutation();

  useEffect(() => {
    if (isDeleteStudentError) {
      if (isFetchBaseQueryError(errorDeleteStudent)) {
        toast.error(getErrorMessage(errorDeleteStudent), { autoClose: 5000 });
      } else if (isSerializedError(errorDeleteStudent)) {
        toast.error(errorDeleteStudent?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isDeleteStudentError, errorDeleteStudent]);

  useEffect(() => {
    if (isSuccessDeleteStudent) {
      toast.success(successDeleteStudent.message, {
        autoClose: 3000,
      });
    }
  }, [isSuccessDeleteStudent, successDeleteStudent]);

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
