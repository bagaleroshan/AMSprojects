
import { ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './component/MUI/Dashboard';
import SideBar from './component/MUI/SideBar';
import MyDropezone from './component/Rough/MyDropezone';
import ReactDropZone from './component/Rough/ReactDropZone';
import DwForm from './component/dwForm/DwForm';

const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });
const MyApp = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
      {/* <Dashboard></Dashboard> */}
      {/* <SideBar></SideBar> */}
      {/* <MuiDrawer></MuiDrawer> */}
      </ThemeProvider>
      {/* <ReactDropZone/> */}
      <DwForm></DwForm>

    </div>
  )
}

export default MyApp
