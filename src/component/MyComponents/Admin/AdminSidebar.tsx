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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  LightTooltip,
} from "../../theme/MuiSidebarTheme";
import { Typography } from "@mui/material";

export default function AdminSidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              onClick={() => navigate("/admin")}
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
                        location.pathname === "/admin" ? "#0195CF" : "default",
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
            {/* ----Attendance----- */}
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  color: "#0195CF",
                },
                backgroundColor:
                  location.pathname === "/admin/attendance"
                    ? "rgba(239,249,255,1)"
                    : "default",
                color:
                  location.pathname === "/admin/attendance"
                    ? "#0195CF"
                    : "default",
              }}
              onClick={() => navigate("/admin/attendance")}
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
                        location.pathname === "/admin/attendance"
                          ? "#0195CF"
                          : "default",
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
                  location.pathname === "/admin/subjects/create"
                    ? "rgba(239,249,255,1)"
                    : "default",
                color:
                  location.pathname === "/admin/users" ||
                  location.pathname === "/admin/users/create" ||
                  location.pathname === "/admin/subjects" ||
                  location.pathname === "/admin/subjects/create" ||
                  location.pathname === "/admin/students" ||
                  location.pathname === "/admin/students/create"
                    ? "#0195CF"
                    : "default",
              }}
              onClick={() => navigate("/admin/users")}
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
                        location.pathname === "/admin/students/create"
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
            <ListItem
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
              onClick={() => navigate("/admin/messages")}
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
                  location.pathname === "/admin/report" ? "#0195CF" : "default",
              }}
              onClick={() => navigate("/admin/report")}
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
              onClick={() => navigate("/admin/update-password")}
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
                color: location.pathname === "/logout" ? "#0195CF" : "default",
              }}
              onClick={() => navigate("/logout")}
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
                        location.pathname === "/logout" ? "#0195CF" : "default",
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
    </>
  );
}
