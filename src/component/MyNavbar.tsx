import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

interface MyNavBarProps {
  token: string | undefined | null;
  role: string | undefined;
}

const MyNavBar: React.FC<MyNavBarProps> = ({ token, role }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {
          <IconButton size="small" edge="start" aria-label="logo">
            <img
              src="/deerwalk.png"
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
            />
          </IconButton>
        }
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AMS
        </Typography>
        {role === "admin" ? (
          token ? (
            <>
              {/* ----------------- User -------------------------------- */}

              <Stack direction="row" spacing={3}>
                <Button color="inherit" href="/admin">
                  My Dashboard
                </Button>
                <Button color="inherit" href="/admin/my-profile">
                  My Profile
                </Button>
                <Button color="inherit" href="/admin/update-password">
                  Update Password
                </Button>
                <Button color="inherit" href="/logout">
                  Logout
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="row" spacing={3}>
                <Button color="inherit" href="/register">
                  Register
                </Button>
                <Button color="inherit" href="/login">
                  Login
                </Button>
              </Stack>
            </>
          )
        ) : token ? (
          <>
            <Stack direction="row" spacing={3}>
              <Button color="inherit" href="/teachers">
                My Dashboard
              </Button>
              <Button color="inherit" href="/teachers/my-profile">
                My Profile
              </Button>
              <Button color="inherit" href="/teachers/update-password">
                Update Password
              </Button>
              <Button color="inherit" href="/logout">
                Logout
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction="row" spacing={3}>
              <Button color="inherit" href="/register">
                Register
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </Stack>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyNavBar;

/* ------------------ Subject ----------------------------- */
/* <Stack direction="row" spacing={3}>
    <Button color="inherit" href="/subjects/create">
      Create Subjects
    </Button>
    <Button color="inherit" href="/subjects/update/${id}">
      Update Subjects
    </Button>
    <Button color="inherit" href="/subjects">
      Subjects
    </Button>

    <Button color="inherit" href="/login">
      Login
    </Button>
  </Stack> */
