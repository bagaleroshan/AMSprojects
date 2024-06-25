import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useReadGroupsByTeacherIdQuery } from "../../services/api/TeacherService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const CompletedCourses = () => {
  const {
    isError: isErrorReadGroups,
    data: dataReadGroups,
    error: errorReadGroups,
  } = useReadGroupsByTeacherIdQuery({ active: false });

  // console.log(
  //   "Completed COurses*************",
  //   dataReadGroups?.result?.results
  // );

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
          return (
            <Box margin={1} key={i}>
              <Paper elevation={2} sx={{ borderRadius: "10px", mt: "2" }}>
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
                      <Typography variant="body2">{value.groupName}</Typography>
                      <Typography variant="body1">{value.teacher}</Typography>
                    </div>

                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "normal", color: "#43a047" }}
                    >
                      Present:0
                    </Typography>

                    <Typography variant="body1" sx={{ color: "#e53935" }}>
                      Absent:0
                    </Typography>
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
              Not a single completed classes yet.
            </Typography>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default CompletedCourses;
