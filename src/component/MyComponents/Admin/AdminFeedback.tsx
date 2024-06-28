import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import { useReadGroupQuery } from "../../../services/api/GroupService";
import RequestFeedback from "../../feedback/RequestFeedback";

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
      <Typography variant="h4" sx={{fontWeight:'bold'}}>Feedback</Typography>
      <Box height={30} />
      <Grid container spacing={2}>
        {resultsArray.length === 0 ? (
          <p>No groups found.</p>
        ) : (
          resultsArray.map(
            (group, index) =>
              group.active === true && (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12}>
                    <Item>
                      <Grid container>
                        <Grid
                          item
                          xs={2}
                          sx={{
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <LocalLibraryOutlinedIcon
                            color="success"
                            fontSize="large"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "grid",
                          }}
                        >
                          <Typography gutterBottom variant="h6" color="primary">
                            {group.subject.subjectName}
                          </Typography>
                          <Box height={5} />
                          <Typography variant="body2" color="primary">
                            Teacher: {group.teacher.fullName}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            Group Name:
                          </Typography>
                          <Typography variant="body1" color="primary">
                            {group.groupName}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <RequestFeedback groupId={group.id} />
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <Button variant="contained">Feedback View</Button>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              )
          )
        )}
      </Grid>
    </>
  );
};

export default AdminFeedback;
