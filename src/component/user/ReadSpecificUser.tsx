import { Avatar, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadUserByIdQuery } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";

const ReadSpecificUser = () => {
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
      <Box className="user-profile-container">
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="/deerwalk.png"
              sx={{ marginBottom: "0.5rem", width: "20%", height: "20%" }}
            ></Avatar>
            <Box height={20} />
            <Typography variant="h5">{user.fullName}</Typography>
          </Box>
          <Box height={10} />
          <Box
            sx={{
              width: "80%",
              height: "45vh",
              backgroundColor: "#EEF8FF",
              margin: "auto",
              borderRadius: "15px",
              padding: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginLeft: "1rem",
              }}
            >
              <Typography>
                <EmailIcon sx={{ marginRight: "0.5rem" }} />
                Email: {user.email}
              </Typography>
              <Typography>
                <PersonIcon sx={{ marginRight: "0.5rem" }} />
                Full Name: {user.fullName}
              </Typography>
              <Typography>
                <PhoneIcon sx={{ marginRight: "0.5rem" }} />
                Phone Number: {user.phoneNumber}
              </Typography>
              <Typography>
                <WorkIcon sx={{ marginRight: "0.5rem" }} />
                Role: {user.role}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReadSpecificUser;
