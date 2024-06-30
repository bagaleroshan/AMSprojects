import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Stack, Typography } from "@mui/material";
import AdminAttendanceReport from "../../../adminComponent/AdminAttendanceReport";

const AdminReport = () => {
  return (
    <>
      <div className="teacherReport">
        {/* <Box sx={{ display: "flex" }}> */}
          {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Attendance Report
            </Typography>
            <Box height={60} />
            <AdminAttendanceReport />
            {/* <Stack display="flex" direction="row" spacing={10}>
              <Typography variant="body2">Group</Typography>
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  // label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Nitan M1</MenuItem>
                  <MenuItem value={20}>Nitan D1</MenuItem>
                  <MenuItem value={30}>Nitan E1</MenuItem>
                  <MenuItem value={30}>Nitan E12</MenuItem>
                </Select>
              </FormControl>
            </Stack> */}
            <Box height={60} />
            {/* <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <Select value={age} onChange={handleChange} displayEmpty>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Addition Report Filters</MenuItem>
                <MenuItem value={20}>Nitan D1</MenuItem>
                <MenuItem value={30}>Nitan E1</MenuItem>
                <MenuItem value={30}>Nitan E12</MenuItem>
              </Select>
            </FormControl> */}
            <Box height={60} />
            <Stack display="flex" direction="row" spacing={10}>
              <Button variant="contained">Search</Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Button variant="contained" color="warning">
                Reset Filters
              </Button>
            </Stack>
          {/* </Box> */}
        {/* </Box> */}
      </div>
    </>
  );
};
export default AdminReport;
