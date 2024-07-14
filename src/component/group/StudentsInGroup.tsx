import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../DeleteConfirmation";
import { useDeleteStudentMutation, useReadStudentByGroupIdQuery, useReadStudentByIdQuery } from "../../services/api/StudentApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
// import StudentExportCSV from "../ExportCSV/StudentExportCSV";
import { Grid, Typography } from "@mui/material";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import TableComponent, { IData } from "../TableComponent/TableComponent";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}
const StudentsInGroup: React.FC = (id) => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Name", accessor: "fullName", width: "350px" },
    { Header: "Email", accessor: "email", width: "350px" },
    { Header: "Contact", accessor: "phoneNumber", width: "350px" },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });
  const { data, isLoading, isError, refetch } = useReadGroupByIdQuery(id.id);
  const { data:studentData, isLoading:studentIsLoading, isError:studentIsError, refetch:refetchStudents } = useReadStudentByGroupIdQuery({id:id.id,query:query});
  console.log(studentData?.result?.results)
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
      <Grid container>
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" gutterBottom>
            Students in this group...
          </Typography>
        </Grid>
      </Grid>

      <TableComponent
        columns={columns}
        data={studentData?.result?.results}
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
export default StudentsInGroup;
