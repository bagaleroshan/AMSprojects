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
  } = useReadGroupsByTeacherIdQuery();

  console.log("dataReadGroups*************", dataReadGroups?.result?.results);

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
      {groups.map((value, i) => {
        return (
          <Paper elevation={2} sx={{ borderRadius: "10px", m: "2" }}>
            <Box sx={{ p: 2 }} key={i}>
              <div className="TDashboardOngoingCourses">
                <LocalLibraryOutlinedIcon color="success" fontSize="large" />
                <div className="TDashboardOngoingSubject">
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ familyWeight: "bold" }}
                  >
                    {value.groupName}
                  </Typography>
                  <Box height={15} />
                  <Typography variant="body2" sx={{ familyWeight: "bold" }}>
                    {value.groupName}
                  </Typography>
                  <Typography variant="body1" sx={{ familyWeight: "bold" }}>
                    {value.teacher}
                  </Typography>
                </div>

                <Button
                  variant="contained"
                  // color="secondary"
                  onClick={() => navigate(`/teachers/${value.id}`)}
                >
                  Take Attendance
                </Button>
                <Typography
                  variant="body1"
                  sx={{ familyWeight: "bold", color: "#43a047" }}
                >
                  Present:0
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ familyWeight: "bold", color: "#e53935" }}
                >
                  Absent:0
                </Typography>
                <Button variant="contained" color="error">
                  Mark As Complete
                </Button>
              </div>
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default OngoingCourses;
