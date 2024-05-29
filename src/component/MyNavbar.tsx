import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const MyNavBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        {
          <IconButton size="small" edge="start" aria-label="logo">
            <img src="/deerwalkLogo.png" alt="Logo" />
          </IconButton>
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AMS
        </Typography>

        <Stack direction="row" spacing={3}>
          {/* ----------------- User -------------------------------- */}
          <Button color="inherit" href="/users">
            Register
          </Button>

          {/* ------------------ Subject ----------------------------- */}
          <Button color="inherit" href="/subjects/create">
            Create Subjects
          </Button>
          <Button color="inherit" href="/subjects/update/${id}">
            Update Subjects
          </Button>

          <Button color="inherit">Subjects</Button>

          <Button color="inherit" href="/students">
            Create Students
          </Button>

          <Button color="inherit" href="/users/login">
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MyNavBar;
