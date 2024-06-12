import { Box, Typography } from "@mui/material";
import AdminTabs from "./AdminTabs";
// import StudentTable from "../../../TableComponent/StudentTable";

const AdminForm = ({ firstTab, secondTab }) => {
  // const [activeTab, setActiveTab] = useState("User");
  return (
    <>
      <div >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <AdminTabs firstTab={firstTab} secondTab={secondTab} />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminForm;
