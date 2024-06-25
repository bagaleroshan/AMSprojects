import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadGroupsByTeacherIdQuery } from "../../services/api/TeacherService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const OngoingCourses = () => {
  const navigate = useNavigate();

  const {
    isError: isErrorReadGroups,
    data: dataReadGroups,
    error: errorReadGroups,
  } = useReadGroupsByTeacherIdQuery({ active: true });

  // console.log("dataReadGroups*************", dataReadGroups?.result?.results);

  const groups = dataReadGroups?.result?.results || [];

  useEffect(() => {
    isErrorReadGroups &&
      (isFetchBaseQueryError(errorReadGroups)
        ? toast.error(getErrorMessage(errorReadGroups))
        : isSerializedError(errorReadGroups)
        ? toast.error(errorReadGroups?.message)
        : "Unknown Error");
  }, [isErrorReadGroups, errorReadGroups]);

  return (
    <>
      {groups.length > 0 ? (
        groups.map((value, i) => {
          // console.log("Value of Read Group By Teacher ID", value);
          return (
            <Box
              margin={1}
              key={i}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/teachers/${value.id}`)}
            >
              <Paper elevation={4} sx={{ borderRadius: "10px", mt: "2" }}>
                <Box sx={{ p: 2 }}>
                  <div className="TDashboardOngoingCourses">
                    <LocalLibraryOutlinedIcon
                      color="success"
                      fontSize="large"
                    />
                    <div className="TDashboardOngoingSubject">
                      <Typography gutterBottom variant="h6">
                        {value.groupName}
                      </Typography>
                      <Box height={15} />
                      <Typography variant="body2">{value.groupName}</Typography>
                      <Typography variant="body1">{value.teacher}</Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/teachers/${value.id}`)}
                    >
                      Take Attendance
                    </Button>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "normal", color: "#43a047" }}
                    >
                      Number of Days Left:0
                    </Typography>

                    {/* <Typography
                      variant="body1"
                      sx={{ fontWeight: "normal", color: "#e53935" }}
                    >
                      Absent:0
                    </Typography> */}
                  </div>
                </Box>
                <Box height={15} />
              </Paper>
            </Box>
          );
        })
      ) : (
        <Box>
          <Box height={30} />
          <Paper
            elevation={1}
            sx={{
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="primary" sx={{ color: "black" }}>
              Not a single ongoing classes yet.
            </Typography>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default OngoingCourses;
