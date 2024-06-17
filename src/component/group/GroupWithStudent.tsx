import { Box, Container, Grid, Paper } from "@mui/material";
import ReadSpecificGroup from "./ReadSpecificGroup";
import StudentsInGroup from "./StudentsInGroup";
import { Link, useNavigate } from "react-router-dom";

const GroupWithStudent = () => {
  const navigate = useNavigate();
  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    navigate("/admin/groups/students");
  }
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ReadSpecificGroup />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              {/* <StudentsInGroup /> */}
              <Link color="primary" onClick={preventDefault} sx={{ mt: 3 }}>
                Add students
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GroupWithStudent;
