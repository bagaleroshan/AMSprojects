import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import CompletedClassesFeedback from "../../feedback/CompletedClassesFeedback";
import OngoingClassesFeedback from "../../feedback/OngoingClassesFeedback";

const AdminFeedback = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="teacherDashboard">
        {/* <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Feedback
        </Typography>
        <Box height={30} />

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              // textColor="secondary"
              // indicatorColor="secondary"
            >
              <Tab label="Ongoing Classes" value="1" />
              <Tab label="Completed Classes" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <OngoingClassesFeedback />
          </TabPanel>
          <TabPanel value="2">
            <CompletedClassesFeedback />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default AdminFeedback;

// import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
// import { Button, Grid, Paper, Typography, styled } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import RequestFeedback from "../../../feedback/RequestFeedback";
// import { useReadGroupQuery } from "../../../services/api/GroupService";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "left",
//   color: theme.palette.text.secondary,
// }));

// const AdminFeedback = () => {
//   const query = {
//     page: 0,
//     limit: 0,
//     findQuery: "",
//     sort: "",
//   };
//   const navigate = useNavigate();
//   const {
//     isError: isErrorViewAll,
//     data: dataViewAll,
//     error: errorViewAll,
//     isLoading: isLoadingViewAll,
//   } = useReadGroupQuery(query);

//   const resultsArray = dataViewAll?.result?.results || [];

//   if (isLoadingViewAll) {
//     return <div>Loading...</div>;
//   }

//   if (isErrorViewAll) {
//     return <div>Error: {errorViewAll.message}</div>;
//   }
//   // console.log(dataViewAll);

//   return (
//     <>
//       <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
//         Feedback
//       </Typography>
//       <Grid container spacing={2}>
//         {isLoadingViewAll ? (
//           <Grid item xs={12}>
//             <Paper
//               elevation={1}
//               sx={{
//                 height: "10vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 transition: "box-shadow 0.3s",
//                 "&:hover": {
//                   cursor: "pointer",
//                   boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//             >
//               <Typography color="primary" sx={{ color: "black" }}>
//                 Loading...
//               </Typography>
//             </Paper>
//           </Grid>
//         ) : resultsArray.length === 0 ? (
//           <Grid item xs={12}>
//             <Paper
//               elevation={1}
//               sx={{
//                 height: "10vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 transition: "box-shadow 0.3s",
//                 "&:hover": {
//                   cursor: "pointer",
//                   boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//             >
//               <Typography color="primary" sx={{ color: "black" }}>
//                 No classes found.
//               </Typography>
//             </Paper>
//           </Grid>
//         ) : (
//           resultsArray.map(
//             (group, index) =>
//               group.active && (
//                 <Grid
//                   item
//                   xs={12}
//                   key={index}
//                   onClick={() => navigate(`/admin/feedback/${group.id}`)}
//                 >
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       p: 2,
//                       transition: "box-shadow 0.2s ease-in-out",
//                       "&:hover": {
//                         cursor: "pointer",
//                         boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
//                         transform: "scale(1.01)",
//                       },
//                     }}
//                     // onClick={() => navigate(`/admin/feedback/${group.id}`)}
//                   >
//                     <Grid container spacing={2} alignItems="center">
//                       <Grid
//                         item
//                         xs={2}
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <LocalLibraryOutlinedIcon
//                           color="primary"
//                           fontSize="large"
//                         />
//                       </Grid>
//                       <Grid item xs={4}>
//                         <Typography variant="h6" color="primary" gutterBottom>
//                           {group.subject.subjectName}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           color="textSecondary"
//                           gutterBottom
//                         >
//                           Teacher: {group.teacher.fullName}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           Group Name: {group.groupName}
//                         </Typography>
//                       </Grid>
//                       <Grid
//                         item
//                         xs={3}
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <RequestFeedback groupId={group.id} />
//                       </Grid>
//                       <Grid
//                         item
//                         xs={3}
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             navigate(`/admin/feedback/${group.id}`)
//                           }
//                           color="primary"
//                           variant="contained"
//                         >
//                           Feedbacks
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </Paper>
//                 </Grid>
//               )
//           )
//         )}
//       </Grid>
//     </>
//   );
// };

// export default AdminFeedback;
