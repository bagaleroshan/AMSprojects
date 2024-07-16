import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedIcon from "@mui/icons-material/Feed";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PasswordIcon from "@mui/icons-material/Password";
import ReportIcon from "@mui/icons-material/Report";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  LightTooltip,
} from "../../theme/MuiSidebarTheme";

export default function AdminSidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleNavigate = (path) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(path);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ display: "flex" }}>
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
                  // "&:hover": { color: "#0195CF" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton size="small" edge="start" aria-label="logo">
                <img
                  src="/deerwalk.png"
                  alt="Logo"
                  style={{ width: "40px", height: "40px" }}
                />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AMS
              </Typography>
              {/* <Box>
                <ListItem onClick={() => navigate("/admin/my-profile")}>
                  <LightTooltip title="My Profile" placement="right">
                    <ListItemButton>
                      <AccountCircleIcon
                        sx={{ height: "40px", width: "40px" }}
                      />
                    </ListItemButton>
                  </LightTooltip>
                </ListItem>
              </Box> */}
            </Toolbar>
          </AppBar>

          {/* Drawer */}

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
              {/* -----Dashboard----- */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color: location.pathname === "/admin" ? "#0195CF" : "default",
                }}
                onClick={() => handleNavigate("/admin")}
              >
                <LightTooltip title="Dashboard" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin"
                            ? "#0195CF"
                            : "default",
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
                </LightTooltip>
              </ListItem>
              {/* Profile */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/my-profile"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/my-profile"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => navigate("/admin/my-profile")}
              >
                <LightTooltip title="My Profile" placement="right">
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
                        color:
                          location.pathname === "/admin/my-profile"
                            ? "#0195CF"
                            : "default",
                      }}
                    >
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      sx={{
                        opacity: open ? 1 : 0,
                        "&:hover": { color: "#0195CF" },
                      }}
                    />
                  </ListItemButton>
                </LightTooltip>
              </ListItem>
              {/* ----Forms---- */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/users" ||
                    location.pathname === "/admin/users/create" ||
                    location.pathname === "/admin/students" ||
                    location.pathname === "/admin/students/create" ||
                    location.pathname === "/admin/subjects" ||
                    location.pathname === "/admin/subjects/create" ||
                    location.pathname === "/admin/groups" ||
                    location.pathname === "/admin/groups/create"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/users" ||
                    location.pathname === "/admin/users/create" ||
                    location.pathname === "/admin/subjects" ||
                    location.pathname === "/admin/subjects/create" ||
                    location.pathname === "/admin/students" ||
                    location.pathname === "/admin/students/create" ||
                    location.pathname === "/admin/groups" ||
                    location.pathname === "/admin/groups/create"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/users")}
              >
                <LightTooltip title="Forms" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/users" ||
                          location.pathname === "/admin/users/create" ||
                          location.pathname === "/admin/subjects" ||
                          location.pathname === "/admin/subjects/create" ||
                          location.pathname === "/admin/students" ||
                          location.pathname === "/admin/students/create" ||
                          location.pathname === "/admin/groups" ||
                          location.pathname === "/admin/groups/create"
                            ? "#0195CF"
                            : "default",
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
                </LightTooltip>
              </ListItem>
              {/* ---Messages--- */}
              {/* <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/messages"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/messages"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/messages")}
              >
                <LightTooltip title="Message" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/messages"
                            ? "#0195CF"
                            : "default",
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
                </LightTooltip>
              </ListItem> */}
              {/* ********Classes************ */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/courses"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/courses"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/courses")}
              >
                <LightTooltip title="Attendance" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/courses"
                            ? "#0195CF"
                            : "default",
                      }}
                    >
                      <MenuBookOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Attendance"
                      sx={{
                        opacity: open ? 1 : 0,
                        "&:hover": { color: "#0195CF" },
                      }}
                    />
                  </ListItemButton>
                </LightTooltip>
              </ListItem>
              {/* ----Report---- */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/report"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/report"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/report")}
              >
                <LightTooltip title="Report" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/report"
                            ? "#0195CF"
                            : "default",
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
                </LightTooltip>
              </ListItem>
              {/* *--------Feedback-----------* */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/feedback"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/feedback"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/feedback")}
              >
                <LightTooltip title="Feedback" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/feedback"
                            ? "#0195CF"
                            : "default",
                      }}
                    >
                      <FeedbackIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Feedback"
                      sx={{
                        opacity: open ? 1 : 0,
                        "&:hover": { color: "#0195CF" },
                      }}
                    />
                  </ListItemButton>
                </LightTooltip>
              </ListItem>
              {/* ----Update Password---- */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/admin/update-password"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/admin/update-password"
                      ? "#0195CF"
                      : "default",
                }}
                onClick={() => handleNavigate("/admin/update-password")}
              >
                <LightTooltip title="Change Password" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/admin/update-password"
                            ? "#0195CF"
                            : "default",
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
                </LightTooltip>
              </ListItem>
              {/* ----Logout---- */}
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    color: "#0195CF",
                  },
                  backgroundColor:
                    location.pathname === "/logout"
                      ? "rgba(239,249,255,1)"
                      : "default",
                  color:
                    location.pathname === "/logout" ? "#0195CF" : "default",
                }}
                onClick={() => handleNavigate("/logout")}
              >
                <LightTooltip title="Logout" placement="right">
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
                        "&:hover": {
                          color: "#0195CF",
                        },
                        color:
                          location.pathname === "/logout"
                            ? "#0195CF"
                            : "default",
                      }}
                    >
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
                </LightTooltip>
              </ListItem>
            </List>

            <Divider />
          </Drawer>
        </Box>
      </ClickAwayListener>
    </>
  );
}
