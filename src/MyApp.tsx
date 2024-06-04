import { ThemeProvider, createTheme } from "@mui/material";
import ASideBar from "./component/MyComponents/Admin/AdminSidebar";
import TRoutes from "./component/MyComponents/Teacher/TRoutes";
import ARoutes from "./component/MyComponents/Admin/ARoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#2196f3",
    },
    success: {
      main: "#43a047",
    },
    warning: {
      main: "#ffeb3b",
    },
    error: {
      main: "#e53935",
    },
  },
  typography: {
    // fontFamily:'"Open Sans", "Helvetica", "Arial", sans-serif'
  },
});
const MyApp = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <TRoutes></TRoutes> */}
        {/* <ASideBar></ASideBar> */}
        <ARoutes></ARoutes>
      </ThemeProvider>
      {/* <ReactDropZone/> */}
      {/* <DwForm></DwForm> */}
      {/* <Table></Table> */}
      {/* <ShowAllSubjects /> */}
    </div>
  );
};

export default MyApp;
