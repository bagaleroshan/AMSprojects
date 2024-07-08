import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AdminMonthlyChart from "./AdminMonthlyChart";
import {
  useReadActiveGroupQuery,
  useReadGroupQuery,
} from "../../../services/api/GroupService";
import { useGetTodayAttendanceQuery } from "../../../services/api/AttendanceService";
const AdminDashboard = () => {
  const { data: dataCount } = useReadActiveGroupQuery("true");
  const { data: completedCount } = useGetTodayAttendanceQuery("");
  const Role = useSelector((store: RootState) => store.user.role);
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
  // console.log(dataCount.result.results.length);
  return (
    <>
      <div className="teacherDashboard">
        {/* <Box sx={{display:"flex"}}>
        <Box component="main" sx={{flexGrow:1,p:3}}> */}
        {Role === "superAdmin" ? (
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Super Admin Dashboard
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Admin Dashboard
          </Typography>
        )}
        <Box height={30} />
        <Typography variant="h6">Overview</Typography>
        <Divider variant="inset" />
        <Box height={20} />
        <Box sx={{ width: "1000px", margin: "auto" }}>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Card sx={{ height: 64 + "vh" }}>
                <CardContent>
                  <Box
                    sx={{ width: "50%", margin: "auto", textAlign: "center" }}
                  >
                    <Stack spacing={15} display="flex">
                      <Typography variant="h6" sx={{ color: "blue" }}>
                        Today's Class Count
                      </Typography>
                      <Typography variant="h3" sx={{ color: "blue" }}>
                        {completedCount.result.count}/
                        {dataCount.result.results.length}
                      </Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: 64 + "vh" }}>
                <CardContent>
                  {/* <LineChart /> */}
                  <AdminMonthlyChart />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box height={50} />
        {/* <Typography variant="h4">Recent Login</Typography> */}
        {/* </Box>
      </Box> */}
      </div>
    </>
  );
};
export default AdminDashboard;
