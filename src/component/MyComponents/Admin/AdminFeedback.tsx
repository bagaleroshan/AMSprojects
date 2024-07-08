import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import RequestFeedback from "../../../feedback/RequestFeedback";
import { useReadGroupQuery } from "../../../services/api/GroupService";
import ShowGroupFeedback from "../../../feedback/ShowGroupFeedback";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const AdminFeedback = () => {
  const query = {
    page: 0,
    limit: 0,
    findQuery: "",
    sort: "",
  };
  const navigate = useNavigate();
  const {
    isError: isErrorViewAll,
    data: dataViewAll,
    error: errorViewAll,
    isLoading: isLoadingViewAll,
  } = useReadGroupQuery(query);

  const resultsArray = dataViewAll?.result?.results || [];

  if (isLoadingViewAll) {
    return <div>Loading...</div>;
  }

  if (isErrorViewAll) {
    return <div>Error: {errorViewAll.message}</div>;
  }
  console.log(dataViewAll);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Feedback
      </Typography>
      <Grid container spacing={2}>
        {isLoadingViewAll ? (
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
          resultsArray.map(
            (group, index) =>
              group.active && (
                <Grid item xs={12} key={index}>
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
                    // onClick={() => navigate(`/admin/feedback/${group.id}`)}
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
                          {group.subject.subjectName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          Teacher: {group.teacher.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Group Name: {group.groupName}
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
                          onClick={() =>
                            navigate(`/admin/feedback/${group.id}`)
                          }
                          color="primary"
                          variant="contained"
                        >
                          Feedbacks
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
          )
        )}
      </Grid>
    </>
  );
};

export default AdminFeedback;
