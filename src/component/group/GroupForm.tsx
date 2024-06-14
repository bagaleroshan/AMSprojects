// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import {
//   Avatar,
//   Box,
//   Container,
//   Grid,
//   Typography,
//   TextField,
// } from "@mui/material";
// import { Form, Formik } from "formik";
// import React, { useState } from "react";
// import { useReadStudentsQuery } from "../../services/api/StudentApi";
// import { useReadSubjectsQuery } from "../../services/api/SubjectService";
// import { useReadUsersQuery } from "../../services/api/UserService";
// import { groupValidationSchema } from "../../validation/groupValidation";
// import DwInput from "../dwComponents/DwInput";
// import DwSelect from "../dwComponents/DwSelect";
// import { IFormValues, IGroup } from "../interfaces/GroupInterface";
// import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
// import DwCheckbox from "../dwComponents/DwCheckbox";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface Query {
//   page?: number;
//   limit?: number;
//   role?: string;
//   findQuery?: string;
//   sort?: string[];
// }

// interface Student {
//   id: string;
//   email: string;
// }

// const GroupForm: React.FC<IFormValues> = ({
//   buttonName = "Create",
//   isLoading = false,
//   group = {} as IGroup,
//   formikRef = undefined,
//   onSubmit = () => {},
// }) => {
//   const [query] = useState<Query>({
//     page: 1,
//     limit: 10,
//     role: "teacher",
//     findQuery: "",
//     sort: [],
//   });

//   /* Teachers */
//   const { data: datatReadTeachers } = useReadUsersQuery({
//     ...query,
//     sort: query.sort?.join(",") || "",
//   });
//   const teachers = (datatReadTeachers?.result?.results || []).map((value) => {
//     return {
//       value: value.id,
//       label: value.fullName,
//     };
//   });

//   /* Subjects */
//   const { data: dataReadSubjects } = useReadSubjectsQuery({
//     ...query,
//     sort: query.sort?.join(","),
//   });
//   const subjects = (dataReadSubjects?.result?.results || []).map((value) => {
//     return {
//       value: value.id,
//       label: value.subjectName,
//     };
//   });

//   /* Students */
//   const { data: dataReadStudents } = useReadStudentsQuery({
//     ...query,
//     sort: query.sort?.join(","),
//   });
//   const students = (dataReadStudents?.result?.results || []).map(
//     (value: Student) => {
//       return {
//         value: value.id,
//         label: value.email,
//       };
//     }
//   );

//   const groupInitialValues: IGroup = {
//     subject: group.subject || "",
//     teacher: group.teacher || "",
//     groupName: group.groupName || "",
//     students: group.students || "",
//     startTime: group.startTime || new Date(),
//     endTime: group.endTime || new Date(),
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={groupInitialValues}
//         innerRef={formikRef}
//         onSubmit={onSubmit}
//         validationSchema={groupValidationSchema}
//         enableReinitialize={true}
//         validateOnBlur={false}
//       >
//         {(formik) => {
//           return (
//             <Form>
//               <Container component="main" maxWidth="xs">
//                 <Box
//                   sx={{
//                     marginTop: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//                     <LockOutlinedIcon />
//                   </Avatar>
//                   <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
//                     {buttonName}
//                   </Typography>
//                   <Box sx={{ mt: 3 }}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12}>
//                         <DwInput
//                           name="groupName"
//                           label="Group Name"
//                           type="text"
//                           fullWidth
//                           onChange={(e) => {
//                             formik.setFieldValue("groupName", e.target.value);
//                           }}
//                           autoFocus={true}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="teacher"
//                           label="Teacher"
//                           onChange={(e) => {
//                             formik.setFieldValue("teacher", e.target.value);
//                           }}
//                           selectLabels={teachers}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="subject"
//                           label="Subject"
//                           onChange={(e) => {
//                             formik.setFieldValue("subject", e.target.value);
//                           }}
//                           selectLabels={subjects}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="students"
//                           label="Students"
//                           onChange={(e) => {
//                             formik.setFieldValue(
//                               "students",
//                               e.target.value ? [e.target.value] : []
//                             );
//                           }}
//                           selectLabels={students}
//                           isLoading={isLoading}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <DatePicker
//                           selected={formik.values.startTime}
//                           onChange={(date) =>
//                             formik.setFieldValue("startTime", date)
//                           }
//                           showTimeSelect
//                           showTimeSelectOnly
//                           timeIntervals={15}
//                           timeCaption="Time"
//                           dateFormat="h:mm aa"
//                           customInput={
//                             <TextField
//                               fullWidth
//                               style={{ width: "100%" }}
//                               label="Start Time"
//                             />
//                           }
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DatePicker
//                           selected={formik.values.endTime}
//                           onChange={(date) =>
//                             formik.setFieldValue("endTime", date)
//                           }
//                           showTimeSelect
//                           showTimeSelectOnly
//                           timeIntervals={15}
//                           timeCaption="Time"
//                           dateFormat="h:mm aa"
//                           customInput={<TextField fullWidth label="End Time" />}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwCheckbox
//                           name="active"
//                           label="Class Ongoing?"
//                           onChange={(e) => {
//                             formik.setFieldValue("active", e.target.checked);
//                           }}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <MuiLoadingButtonTheme
//                           buttonName={buttonName}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Box>
//               </Container>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default GroupForm;

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import {
//   Avatar,
//   Box,
//   Container,
//   Grid,
//   Typography,
//   TextField,
// } from "@mui/material";
// import { Form, Formik } from "formik";
// import React, { useState } from "react";
// import { useReadStudentsQuery } from "../../services/api/StudentApi";
// import { useReadSubjectsQuery } from "../../services/api/SubjectService";
// import { useReadUsersQuery } from "../../services/api/UserService";
// import { groupValidationSchema } from "../../validation/groupValidation";
// import DwInput from "../dwComponents/DwInput";
// import DwSelect from "../dwComponents/DwSelect";
// import { IFormValues, IGroup } from "../interfaces/GroupInterface";
// import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
// import DwCheckbox from "../dwComponents/DwCheckbox";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface Query {
//   page?: number;
//   limit?: number;
//   role?: string;
//   findQuery?: string;
//   sort?: string[];
// }

// interface Student {
//   id: string;
//   email: string;
// }

// const GroupForm: React.FC<IFormValues> = ({
//   buttonName = "Create",
//   isLoading = false,
//   group = {} as IGroup,
//   formikRef = undefined,
//   onSubmit = () => {},
// }) => {
//   const [query] = useState<Query>({
//     page: 1,
//     limit: 10,
//     role: "teacher",
//     findQuery: "",
//     sort: [],
//   });

//   /* Teachers */
//   const { data: datatReadTeachers } = useReadUsersQuery({
//     ...query,
//     sort: query.sort?.join(",") || "",
//   });
//   console.log(datatReadTeachers);
//   const teachers = (datatReadTeachers?.result?.results || []).map((value) => {
//     return {
//       value: value.id,
//       label: value.fullName,
//     };
//   });

//   /* Subjects */
//   const { data: dataReadSubjects } = useReadSubjectsQuery({
//     ...query,
//     sort: query.sort?.join(","),
//   });
//   const subjects = (dataReadSubjects?.result?.results || []).map((value) => {
//     return {
//       value: value.id,
//       label: value.subjectName,
//     };
//   });

//   /* Students */
//   const { data: dataReadStudents } = useReadStudentsQuery({
//     ...query,
//     sort: query.sort?.join(","),
//   });
//   const students = (dataReadStudents?.result?.results || []).map(
//     (value: Student) => {
//       return {
//         value: value.id,
//         label: value.email,
//       };
//     }
//   );

//   const groupInitialValues: IGroup = {
//     subject: group.subject || "",
//     teacher: group.teacher || "",
//     groupName: group.groupName || "",
//     students: group.students || "",
//     startTime: new Date(),
//     endTime: new Date(),
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={groupInitialValues}
//         innerRef={formikRef}
//         onSubmit={onSubmit}
//         validationSchema={groupValidationSchema}
//         enableReinitialize={true}
//         validateOnBlur={false}
//       >
//         {(formik) => {
//           return (
//             <Form>
//               <Container component="main" maxWidth="xs">
//                 <Box
//                   sx={{
//                     marginTop: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//                     <LockOutlinedIcon />
//                   </Avatar>
//                   <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
//                     {buttonName}
//                   </Typography>
//                   <Box sx={{ mt: 3 }}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12}>
//                         <DwInput
//                           name="groupName"
//                           label="Group Name"
//                           type="text"
//                           fullWidth
//                           onChange={(e) => {
//                             formik.setFieldValue("groupName", e.target.value);
//                           }}
//                           autoFocus={true}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="teacher"
//                           label="Teacher"
//                           onChange={(e) => {
//                             formik.setFieldValue("teacher", e.target.value);
//                           }}
//                           selectLabels={teachers}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="subject"
//                           label="Subject"
//                           onChange={(e) => {
//                             formik.setFieldValue("subject", e.target.value);
//                           }}
//                           selectLabels={subjects}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DwSelect
//                           name="students"
//                           label="Students"
//                           onChange={(e) => {
//                             formik.setFieldValue(
//                               "students",
//                               e.target.value ? [e.target.value] : []
//                             );
//                           }}
//                           selectLabels={students}
//                           isLoading={isLoading}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <DatePicker
//                           selected={formik.values.startTime}
//                           onChange={(date) =>
//                             formik.setFieldValue("startTime", date)
//                           }
//                           showTimeSelect
//                           showTimeSelectOnly
//                           timeIntervals={15}
//                           timeCaption="Time"
//                           dateFormat="h:mm aa"
//                           customInput={
//                             <TextField
//                               fullWidth
//                               style={{ width: "100%" }}
//                               label="Start Time"
//                             />
//                           }
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <DatePicker
//                           selected={formik.values.endTime}
//                           onChange={(date) =>
//                             formik.setFieldValue("endTime", date)
//                           }
//                           showTimeSelect
//                           showTimeSelectOnly
//                           timeIntervals={15}
//                           timeCaption="Time"
//                           dateFormat="h:mm aa"
//                           customInput={
//                             <TextField
//                               fullWidth
//                               style={{ width: "100%" }}
//                               label="End Time"
//                             />
//                           }
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <MuiLoadingButtonTheme
//                           buttonName={buttonName}
//                           isLoading={isLoading}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Box>
//               </Container>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default GroupForm;
