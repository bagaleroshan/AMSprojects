import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadStudentByIdQuery } from "../../services/api/StudentApi";
import { useMyProfileQuery } from "../../services/api/UserService";
import { RootState } from "../../store/store";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const ReadSpecificStudent = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadStudentByIdQuery(id);
  const student = dataViewSpecific?.result || {};

  useEffect(() => {
    if (isErrorViewSpecific) {
      if (isFetchBaseQueryError(errorViewSpecific)) {
        toast.error(getErrorMessage(errorViewSpecific), { autoClose: 5000 });
      } else if (isSerializedError(errorViewSpecific)) {
        toast.error(errorViewSpecific?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorViewSpecific, errorViewSpecific]);

  const token = useSelector((store: RootState) => store.user.token);

  const {
    isError: isErrorMyProfile,
    error: errorMyProfile,
    refetch,
  } = useMyProfileQuery(token);

  useEffect(() => {
    // Trigger refetch when token changes or on initial load
    refetch();
  }, [token, refetch]);

  useEffect(() => {
    if (isErrorMyProfile) {
      if (isFetchBaseQueryError(errorMyProfile)) {
        toast.error(getErrorMessage(errorMyProfile), { autoClose: 5000 });
      } else if (isSerializedError(errorMyProfile)) {
        toast.error(errorMyProfile?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorMyProfile, errorMyProfile]);

  return (
    <>
      <div>
        <Box className="user-profile-container">
          <Box
            sx={{
              width: "50%",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/deerwalk.png"
                sx={{ marginBottom: "0.5rem", width: "20%", height: "20%" }}
              />
              <Box height={20} />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Student Details
              </Typography>
            </Box>
            <Box height={5} />
            <Box
              sx={{
                height: "40vh",
                backgroundColor: "white",
                margin: "auto",
                borderRadius: "15px",
                padding: "2rem",
                display: "flex",
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon />
                  <Typography sx={{ marginLeft: "10px" }}>
                    Full Name:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {student.fullName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon />
                  <Typography sx={{ marginLeft: "10px" }}>Email: </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {student.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PhoneIcon />
                  <Typography sx={{ marginLeft: "10px" }}>
                    Phone Number:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {student.phoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ReadSpecificStudent;
