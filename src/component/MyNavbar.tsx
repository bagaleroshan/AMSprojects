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
          <Button color="inherit" href="/subjects/create">
            Create Subjects
          </Button>
          <Button color="inherit" href="/subjects/update">
            Update Subjects
          </Button>
          <Button color="inherit" href="/subjects">
            Subjects
          </Button>
          <Button color="inherit">Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MyNavBar;
