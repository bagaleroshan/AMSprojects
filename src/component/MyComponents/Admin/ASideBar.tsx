import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import FeedIcon from "@mui/icons-material/Feed";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PasswordIcon from "@mui/icons-material/Password";
import ReportIcon from "@mui/icons-material/Report";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import AAttendance from "./AAttendance";
import ADashboard from "./ADashboard";
import AForms from "./AForms";
import AMessages from "./AMessages";
import AReport from "./AReport";
import AChangePassword from "./AChangePassword";
import ALogout from "./ALogout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ASideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // const [menudata, setMenudata] = useState("Dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate=useNavigate("");

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                "&:hover": { color: "#0195CF" },
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{ "&:hover": { color: "#0195CF" } }}>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ "&:hover": { color: "#0195CF" } }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              // onClick={() => setMenudata("Dashboard")}
              onClick={() => navigate("/Dashboard")}

            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              // onClick={() => setMenudata("Attendance")}
              onClick={() => navigate("/Dashboard/Attendance")}

            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <SpeakerNotesIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Attendance"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
            //  onClick={() => setMenudata("Forms")}
            onClick={() => navigate("/Dashboard/Forms")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Forms"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
             // onClick={() => setMenudata("Messages")}
             onClick={() => navigate("/Dashboard/Message")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Message"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
             // onClick={() => setMenudata("Report")}
             onClick={() => navigate("/Dashboard/Report")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Report"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
             // onClick={() => setMenudata("Change Password")}
             onClick={() => navigate("/Dashboard/ChangePassword")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
             // onClick={() => setMenudata("Logout")}
             onClick={() => navigate("/Dashboard/Logout")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    "&:hover": { color: "#0195CF" },
                  }}
                >
                  {/* <SlLogout /> */}
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": { color: "#0195CF" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {menudata == "Dashboard" && <ADashboard></ADashboard>}
          {menudata == "Attendance" && <AAttendance></AAttendance>}
          {menudata == "Forms" && <AForms></AForms>}
          {menudata == "Messages" && <AMessages></AMessages>}
          {menudata == "Report" && <AReport></AReport>}
          {menudata == "Change Password" && <AChangePassword></AChangePassword>}
          {menudata == "Logout" && <ALogout></ALogout>}
        </Box> */}
      </Box>
    </>
  );
}
