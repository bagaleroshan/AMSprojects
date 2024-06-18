import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../../../../utils/utils";
import { useReadUserByIdQuery } from "../../../../../services/api/UserService";
import AdminForm from "../AdminForm";
import AdminTabs from "../AdminTabs";

const SpecificUserDetail = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadUserByIdQuery(id);
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
      <Box height={60} />
      <Box sx={{ width: "40%", margin: "auto" }}>
        <Paper elevation={1} sx={{ p: "2rem" }}>
          <Stack display="flex" flexDirection="column" spacing={2}>
            <Typography variant="body1">Name: {user.fullName}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Contact:{user.phoneNumber}</Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default SpecificUserDetail;
