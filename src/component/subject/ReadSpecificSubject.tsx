import ClassIcon from "@mui/icons-material/Class";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadSubjectByIdQuery } from "../../services/api/SubjectService";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const ReadSpecificSubject = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadSubjectByIdQuery(id);
  const subject = dataViewSpecific?.result || {};

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

  return (
    <>
      <div>
        <Box className="subject-details-container">
          <Box
            sx={{
              width: "50%",
              borderRadius: "10px",
              padding: "1.5rem",
              margin: "auto", // Centering the container horizontally
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
                sx={{ mb: "0.5rem", width: "20%", height: "20%" }}
              />
              <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold" }}>
                Subject Details
              </Typography>
            </Box>
            <Box height={5} />
            <Box
              sx={{
                height: "40vh",
                mt: 3,
                backgroundColor: "white",
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
                  <SchoolIcon />
                  <Typography sx={{ marginLeft: "10px" }}>
                    Subject Name:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {subject.subjectName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CodeIcon />
                  <Typography sx={{ marginLeft: "10px" }}>
                    Subject Code:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {changeFirstName(subject.subjectCode)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ClassIcon />
                  <Typography sx={{ marginLeft: "10px" }}>
                    Number of Classes:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {subject.numberOfClasses}
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

export default ReadSpecificSubject;
