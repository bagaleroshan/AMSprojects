import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import LineChart from "../chart/LineChart";
import DwMuiSelect from "../styling/DwMuiSelect";

const AdminDashboard = () => {
  return (
    <>
      <Typography variant="h4"> Admin Dashboard</Typography>
      <Box height={30} />
      <Typography variant="h6">Overview</Typography>
      <Divider variant="inset" />
      <Box height={20} />
      <Box sx={{ width: "1000px", margin: "auto" }}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card sx={{ height: 64 + "vh" }}>
              <CardContent>
                <Box sx={{ width: "190px", margin: "auto" }}>
                  <Stack spacing={15} display="flex">
                    <Typography variant="h6" sx={{ color: "blue" }}>
                      Today's Class Count
                    </Typography>
                    <Typography variant="h3" sx={{ color: "blue" }}>
                      7/26
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: 64 + "vh" }}>
              <CardContent>
                <LineChart />
              </CardContent>
              <CardActions>
                <DwMuiSelect />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box height={50} />
      <Typography variant="h4">Recent Login</Typography>
    </>
  );
};

export default AdminDashboard;
