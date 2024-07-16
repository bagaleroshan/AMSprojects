import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestFeedback from "../../feedback/RequestFeedback";
import { useReadActiveGroupQuery } from "../../services/api/GroupService";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { Group } from "../interfaces/FeedbackInterface";

const CompletedClassesFeedback = () => {
  const navigate = useNavigate();
  const {
    isError: isErrorReadCompletedGroups,
    data: dataReadCompletedGroups,
    isLoading: isLoadingReadCompletedGroups,
    error: errorReadCompletedGroups,
  } = useReadActiveGroupQuery("false");

  const resultsArray = dataReadCompletedGroups?.result?.results || [];
  // console.log("resultsArray****", resultsArray);

  useEffect(() => {
    isErrorReadCompletedGroups &&
      (isFetchBaseQueryError(errorReadCompletedGroups)
        ? toast.error(getErrorMessage(errorReadCompletedGroups))
        : isSerializedError(errorReadCompletedGroups)
        ? toast.error(errorReadCompletedGroups?.message)
        : "Unknown Error");
  }, [isErrorReadCompletedGroups, errorReadCompletedGroups]);

  if (isLoadingReadCompletedGroups) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {isLoadingReadCompletedGroups ? (
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
        ) : resultsArray.length === 0 ? (
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
                No classes found.
              </Typography>
            </Paper>
          </Grid>
        ) : (
          resultsArray.map((group: Group, index: number) => (
            <Grid
              item
              xs={12}
              key={index}
              onClick={() => navigate(`/admin/feedback/${group.id}`)}
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
                    <Typography variant="h6" color="primary" gutterBottom>
                      {group.groupName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Teacher: {changeFirstName(group?.teacher?.fullName)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Subject Name: {group.subject.subjectName}
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
                    <RequestFeedback groupId={group.id} />
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
                      onClick={() => navigate(`/admin/feedback/${group.id}`)}
                      color="primary"
                      variant="contained"
                    >
                      View Feedbacks
                    </Button>
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

export default CompletedClassesFeedback;
