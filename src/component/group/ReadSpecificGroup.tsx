import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import {
  formatTime,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { AddStudentsToGroup } from "./AddStudentsToGroup";
import StudentsInGroup from "./StudentsInGroup";

const ReadSpecificGroup = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(id);
  const group = dataViewSpecific?.result || {};

  useEffect(() => {
    if (isErrorViewSpecific) {
      if (isFetchBaseQueryError(errorViewSpecific)) {
        toast.error(getErrorMessage(errorViewSpecific));
      } else if (isSerializedError(errorViewSpecific)) {
        toast.error(errorViewSpecific?.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorViewSpecific, errorViewSpecific]);
  // console.log(dataViewSpecific);
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <React.Fragment>
                <TableContainer>
                  <Table size="medium">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "lightblue" }}>
                        <TableCell>Group Name</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{group.groupName}</TableCell>
                        <TableCell>{group.subject?.subjectName}</TableCell>
                        <TableCell>{group.teacher?.fullName}</TableCell>
                        <TableCell>{formatTime(group?.startTime)}</TableCell>
                        <TableCell>{formatTime(group?.endTime)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Link color="primary" sx={{ mt: 3 }}>
              <AddStudentsToGroup id={id} />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <StudentsInGroup id={id} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ReadSpecificGroup;
