import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSubjectMutation,
  useReadSubjectsQuery,
} from "../../services/api/SubjectService";
import SubjectExportCSV from "../ExportCSV/SubjectExportCSV";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import { Box, Typography } from "@mui/material";
import DeleteConfirmation from "../../DeleteConfirmation";
import { getErrorMessage, isFetchBaseQueryError, isSerializedError } from "../../utils/utils";
import { toast } from "react-toastify";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const ShowAllSubjects: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Name", accessor: "subjectName", width: "350px" },
    { Header: "Code", accessor: "subjectCode", width: "350px" },
    { Header: "Classes", accessor: "numberOfClasses", width: "350px" },
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
  const [
    deleteSubject,
    {
      isError: isErrorDeleteSubject,
      error: errorDeleteSubject,
      isSuccess: isSuccessDeleteSubject,
      data: dataDeleteSubject,
    },
  ] = useDeleteSubjectMutation();
  useEffect(() => {
    if (isErrorDeleteSubject) {
      if (isFetchBaseQueryError(errorDeleteSubject)) {
        toast.error(getErrorMessage(errorDeleteSubject), { autoClose: 5000 });
      } else if (isSerializedError(errorDeleteSubject)) {
        toast.error(errorDeleteSubject?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorDeleteSubject, errorDeleteSubject]);

  useEffect(() => {
    if (isSuccessDeleteSubject) {
      toast.success(dataDeleteSubject.message, {
        autoClose: 3000,
      });
    }
  }, [isSuccessDeleteSubject, dataDeleteSubject]);



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
    navigate(`/admin/subjects/update/${selectedRowData[0].id}`, {
      // state: { updateData: selectedRowData[0] },
      replace: true,
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/subjects/${selectedRowData[0].id}`, {
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
