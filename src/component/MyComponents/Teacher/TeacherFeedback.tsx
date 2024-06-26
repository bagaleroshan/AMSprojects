import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const TeacherFeedback = () => {
  return (
    <>
      <Typography variant="h4">Feedback</Typography>
      <Box height={30} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Grid container>
              <Grid
                item
                xs={3}
                sx={{
                  display: "grid",
                  placeItems:'center',
                }}
              >
                <LocalLibraryOutlinedIcon
                  color="success"
                  fontSize="large"
                  
                />
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  display: "grid",
                }}
              >
                <Typography>
                  Group Name hello i am the Lorem, ipsum dolor.
                </Typography>
                <Typography>Group Name</Typography>
                <Typography>Group Name</Typography>
              </Grid>
             
              <Grid
                xs={4}
                sx={{
                  display:'grid',
                  placeItems:'center',
                }}
              >
                <Button variant="contained">Feedback View</Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default TeacherFeedback;
