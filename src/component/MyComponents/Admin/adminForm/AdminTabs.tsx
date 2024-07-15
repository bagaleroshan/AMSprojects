import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Students from "./student/Student";
import Subject from "./subject/Subject";
import User from "./user/User";
import Group from "./group/Group";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  color: "red",
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "80%",
    width: "100%",
    backgroundColor: "#1976D2",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  // textTransform: "none",
  //fontWeight: theme.typography.fontWeightRegular,
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#757575",
  "&.Mui-selected": {
    color: "#1976D2",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#30c1d1",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabTypes = ["users", "students", "subjects", "groups"];

interface AdminTabsProps {
  firstTab: string;
  secondTab?: string;
}

export default function AdminTabs({ firstTab, secondTab }: AdminTabsProps) {
  const navigate = useNavigate();
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/admin/${tabTypes[newValue]}`);
  };

  // console.log("--------", firstTab, secondTab);

  const value = tabTypes.indexOf(firstTab);
  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
      <StyledTabs
        value={tabTypes.indexOf(firstTab)}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          label="Users"
          {...a11yProps(0)}
          onClick={() => {
            navigate("/admin/users");
          }}
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        />

        <Tab
          label="Students"
          {...a11yProps(1)}
          onClick={() => {
            navigate("/admin/students");
          }}
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        />
        <Tab
          label="Subjects"
          {...a11yProps(2)}
          onClick={() => {
            navigate("/admin/subjects");
          }}
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        />
        <Tab
          label="Groups"
          {...a11yProps(3)}
          onClick={() => {
            navigate("/admin/groups");
          }}
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </StyledTabs>

      <CustomTabPanel value={value} index={0}>
        <User secondTab={secondTab} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Students secondTab={secondTab} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Subject secondTab={secondTab} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Group secondTab={secondTab} />
      </CustomTabPanel>
    </Box>
  );
}
