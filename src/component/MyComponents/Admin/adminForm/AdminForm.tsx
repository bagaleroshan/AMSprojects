import { Box, Typography } from "@mui/material";
import AdminTabs from "./AdminTabs";
// import StudentTable from "../../../TableComponent/StudentTable";

const AdminForm = ({ firstTab, secondTab, header }) => {
  // const [activeTab, setActiveTab] = useState("User");
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h4"
              sx={{ paddingLeft: "3rem", fontWeight: "550" }}
            >
              {header}
            </Typography>
            <Box height={30} />
            <AdminTabs
              firstTab={firstTab}
              secondTab={secondTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />
            {/* ********modify********* */}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminForm;
