import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useReadStudentsQuery,
} from "../../services/api/StudentApi";
import TableComponent, { IData } from "../TableComponent/TableComponent";
import { Box, Paper, Stack, Typography } from "@mui/material";

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

  const handleDeleteClick = (selectedRowData: IData[]) => {
    selectedRowData.forEach((value: IData) => {
      deleteStudents(value.id);
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/students/${selectedRowData[0].id}`, {
      replace: true,
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
        onEditClick={handleStudentEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      /> */}

      {data.result.results.length === 0 ? (
        <div>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack>
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
            </Stack>
            <Typography variant="h5"> No students is available</Typography>
          </Box>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default StudentTable;
