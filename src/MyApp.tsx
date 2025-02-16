import { ThemeProvider, createTheme } from "@mui/material";
import ARoutes from "./component/mycomponents/admin/ARoutes";
import TRoutes from "./component/mycomponents/teacher/TeacherRoutes";

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
        <TRoutes></TRoutes>
        {/* <ASideBar></ASideBar> */}
        {/* <ARoutes></ARoutes> */}
      </ThemeProvider>
      {/* <ReactDropZone/> */}
      {/* <DwForm></DwForm> */}
      {/* <Table></Table> */}
      {/* <ShowAllSubjects /> */}
    </div>
  );
};

export default MyApp;
