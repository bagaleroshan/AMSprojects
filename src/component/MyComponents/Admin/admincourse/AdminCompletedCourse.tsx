import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useReadGroupQuery } from "../../../../services/api/GroupService";
import { changeFirstName } from "../../../../utils/utils";
import { useNavigate } from "react-router-dom";

interface Subject {
  subjectName: string;
}

interface Group {
  subject: Subject;
  groupName: string;
  active: boolean;
}

interface DataViewAll {
  result: {
    results: Group[];
  };
}

const AdminCompletedCourse = () => {
  const navigate = useNavigate();

  const query = {
    page: 0,
    limit: 0,
    findQuery: "",
    sort: "",
  };

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
  return (
    <>
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
                No completed classes yet.
              </Typography>
            </Paper>
          </Grid>
        ) : (
          resultsArray.map((group, index) => (
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
                    <div
                      className="TDashboardOngoingSubject"
                      style={{ width: "15rem" }}
                    >
                      <Typography gutterBottom variant="h6" color="primary">
                        {group.groupName}
                      </Typography>
                      <Box height={5} />
                      <Typography variant="body2" color="primary">
                        Teacher:{group.teacher.fullName}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Subject Name:
                      </Typography>
                      <Typography variant="body1" color="primary">
                        {group.subject.subjectName}
                      </Typography>
                    </div>
                    <Typography
                      variant="body1"
                      color="success"
                      sx={{ fontWeight: "normal", color: "green" }}
                    >
                      Present: 0
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Subject: {group.subject.subjectName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Teacher: {changeFirstName(group.teacher.fullName)}
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
                  {/* <Grid
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
                  </Grid> */}
                </Grid>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default AdminCompletedCourse;
