import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";

const ReadSpecificGroup = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(id);
  const group = dataViewSpecific?.result || {};
  console.log("group**********************", dataViewSpecific?.result);

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
      <TableContainer>
        <Table>
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
              <TableCell>{group.startTime} </TableCell>
              <TableCell>{group.endTime} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReadSpecificGroup;
