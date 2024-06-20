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
import { format } from "date-fns";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import {
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
    isErrorViewSpecific &&
      (isFetchBaseQueryError(errorViewSpecific)
        ? toast.error(getErrorMessage(errorViewSpecific))
        : isSerializedError(errorViewSpecific)
        ? toast.error(errorViewSpecific?.message)
        : "Unknown Error");
  }, [isErrorViewSpecific, errorViewSpecific]);

  return (
    <>
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
                        <TableRow>
                          <TableCell>Group Name</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Teacher </TableCell>
                          <TableCell>Start Time </TableCell>
                          <TableCell>End Time </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{group.groupName}</TableCell>
                          <TableCell>{group.subject?.subjectName}</TableCell>
                          <TableCell>{group.teacher?.fullName} </TableCell>
                          {/* <TableCell>
                            {format(new Date(group.startTime), "HH:mm")}
                          </TableCell>
                          <TableCell>
                            {(new Date(group.endTime), "HH:mm")}
                          </TableCell> */}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Link color="primary" sx={{ mt: 3 }}>
                  <AddStudentsToGroup id={id} />
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <StudentsInGroup id={id} />
              {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ReadSpecificGroup;
