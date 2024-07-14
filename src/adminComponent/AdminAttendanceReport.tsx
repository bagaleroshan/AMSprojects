// import DownloadIcon from "@mui/icons-material/Download";
// import { Button, FormControl, Stack } from "@mui/material";
// import { Form, Formik } from "formik";
// import { useState } from "react";
// import DwSelect from "../component/dwComponents/DwSelect";
// import { useReadGroupQuery } from "../services/api/GroupService";
// import ReportTable from "./ReportTable";
// import { IGroup } from "../component/interfaces/GroupInterface";

// const AdminAttendanceReport = () => {
//   const query = { page: 0, limit: 0, findQuery: "", sort: "" };
//   const { data: dataAllGroups, isLoading: isLoadingAllGroups } =
//     useReadGroupQuery(query);
//   // console.log("dataAllGroups******", dataAllGroups?.result?.results);
//   const [selectedGroupId, setSelectedGroupId] = useState("");

//   const allGroups = dataAllGroups?.result?.results || [];
//   const groups = allGroups.map((value: IGroup) => ({
//     value: value.id,
//     label: value.groupName,
//   }));

//   return (
//     <>
//       <div>
//         <Formik initialValues={{ groupName: groups.groupName || "" }}>
//           {(formik) => {
//             return (
//               <Form>
//                 <Stack display="flex" direction="row" spacing={10}>
//                   <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
//                     <DwSelect
//                       name="group"
//                       label="Groups"
//                       onChange={(e) => {
//                         formik.setFieldValue("group", e.target.value);
//                         setSelectedGroupId(e.target.value);
//                       }}
//                       selectLabels={groups}
//                       isLoading={isLoadingAllGroups}
//                     />
//                   </FormControl>
//                 </Stack>
//                 <Stack display="flex" direction="row" spacing={10}></Stack>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   startIcon={<DownloadIcon />}
//                 >
//                   Download
//                 </Button>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//       <div>
//         <ReportTable id={{ selectedGroupId }}></ReportTable>
//       </div>
//     </>
//   );
// };

// export default AdminAttendanceReport;
