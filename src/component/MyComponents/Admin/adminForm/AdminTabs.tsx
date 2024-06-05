import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Groups from "./group/Group";
import Students from "./student/Student";
import Subject from "./subject/Subject";
import User from "./user/User";

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
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#141414",
  // fontWeight:"400",
  "&.Mui-selected": {
    color: "#0c828f",
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

const tabTypes = ["User", "Students", "Subjects", "Groups"];

export default function AdminTabs({ onTabChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange(tabTypes[newValue]);
    console.log(newValue);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="Users" {...a11yProps(0)} />
          <StyledTab label="Students" {...a11yProps(1)} />
          <Tab
            label="Subjects"
            {...a11yProps(2)}
            onClick={() => {
              navigate("/admin/forms/subjects");
            }}
          />
          <StyledTab label="Groups" {...a11yProps(3)} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <User />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Students />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Subject />
        {/* <ShowAllSubjects /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Groups />
      </CustomTabPanel>
    </Box>
  );
}
