import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Group } from "../../component/interfaces/FeedbackInterface";
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
    isLoading: isLoadingReadGroups,
  } = useReadGroupsByTeacherIdQuery("active=false");

  const groups: Group[] = dataReadGroups?.result?.results || [];

  useEffect(() => {
    isErrorReadGroups &&
      (isFetchBaseQueryError(errorReadGroups)
        ? toast.error(getErrorMessage(errorReadGroups))
        : isSerializedError(errorReadGroups)
        ? toast.error(errorReadGroups?.message)
        : "Unknown Error");
  }, [isErrorReadGroups, errorReadGroups]);
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2}>
        {isLoadingReadGroups ? (
          <Grid item xs={12}>
            <Paper
              elevation={1}
              sx={{
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography color="primary" sx={{ color: "black" }}>
                Loading...
              </Typography>
            </Paper>
          </Grid>
        ) : groups.length === 0 ? (
          <Grid item xs={12}>
            <Paper
              elevation={1}
              sx={{
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography color="primary" sx={{ color: "black" }}>
                No completed classes yet.
              </Typography>
            </Paper>
          </Grid>
        ) : (
          groups.map((group, index) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => navigate(`/teachers/${group.id}`)}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  transition: "box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LocalLibraryOutlinedIcon
                      color="primary"
                      fontSize="large"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6">
                      {group.groupName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {group.subject.subjectName}
                    </Typography>
                  
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/teachers/${group.id}`)}
                    >
                      Attendance Detail
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "normal", color: "#43a047" }}
                    >
                      Number of Days Left:0
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default CompletedCourses;
