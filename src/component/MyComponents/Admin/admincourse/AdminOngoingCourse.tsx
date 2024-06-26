import { Box, Button, Paper, Typography } from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { useReadGroupQuery } from "../../../../services/api/GroupService";

const AdminOngoingCourse = () => {
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
      {resultsArray.length === 0 && <p>No groups found.</p>}
      {resultsArray.map(
        (group, index) =>
          group.active === true && (
            <Box
              key={index}
              margin={1}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Paper elevation={4} sx={{ borderRadius: "10px", mt: 2 }}>
                <Box sx={{ p: 2 }}>
                  <div className="TDashboardOngoingCourses">
                    <LocalLibraryOutlinedIcon
                      color="success"
                      fontSize="large"
                    />
                    <div className="TDashboardOngoingSubject">
                      <Typography gutterBottom variant="h6" color="primary">
                        {group.subject.subjectName}
                      </Typography>
                      <Box height={15} />
                      <Typography variant="body2" color="primary">
                        Group Name:
                      </Typography>
                      <Typography variant="body1" color="primary">
                        {group.groupName}
                      </Typography>
                    </div>
                    <Button variant="contained" color="primary">
                      Take Attendance
                    </Button>
                    <Typography
                      variant="body1"
                      color="success"
                      sx={{ fontWeight: "normal", color: "green" }}
                    >
                      Present: 0
                    </Typography>
                    <Typography
                      variant="body1"
                      color="error"
                      sx={{ fontWeight: "normal" }}
                    >
                      Absent: 0
                    </Typography>
                    {/* <Button variant="contained" color="error">
                      Mark As Complete
                    </Button> */}
                  </div>
                </Box>
                <Box height={15} />
              </Paper>
            </Box>
          )
      )}
    </>
  );
};

export default AdminOngoingCourse;
