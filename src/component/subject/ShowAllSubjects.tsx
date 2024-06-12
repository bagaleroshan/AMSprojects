import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSubjectMutation,
  useReadSubjectsQuery,
} from "../../services/api/SubjectService";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import { Box, Typography } from "@mui/material";

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
    selectedRowData.forEach((value: IData) => {
      deleteSubject(value.id);
    });
  };

  return (
    <div>
      {/* <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      /> */}

{data.result.results.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5"> No subject is available</Typography>
        </Box>
      ) : (
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
      )}
    </div>
  );
};

export default ShowAllSubjects;
