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
import { useReadUserByIdQuery } from "../../services/api/UserService";
// import { isFetchBaseQueryError, isSerializedError } from "../../utils/utils";/

const ReadSpecificUser = () => {
  const params = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadUserByIdQuery(params.id);
  const user = dataViewSpecific?.result || {};

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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{user.Name}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Contact} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReadSpecificUser;
