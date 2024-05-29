import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { studentValidationSchema } from "../../validation/studentValidation";
import DwInput from "../dwForm/DwInput";
import DwSelect from "../dwForm/DwSelect";
import { IFormValues, IStudent } from "./studentInterface";

const StudentForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  student = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const initialValues: IStudent = {
    fullName: student?.fullName || "",
    email: student?.email || "",
    course: student?.course || "",
    phoneNumber: student?.phoneNumber || "",
  };
  const courseOptions = [
    { value: "course1", label: "Course 1" },
    { value: "course2", label: "Course 2" },
    { value: "course3", label: "Course 3" },
  ];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={studentValidationSchema}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ marginTop: "10px", padding: "16px" }}
              >
                <DwInput
                  name="fullName"
                  label="Full Name"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("fullName", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="email"
                  label="Email"
                  type="email"
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwSelect
                  name="course"
                  label="Course"
                  selectLabels={courseOptions}
                  isLoading={isLoading}
                  onChange={(e) => {
                    formik.setFieldValue("course", e.target.value);
                  }}
                ></DwSelect>

                <DwInput
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  onChange={(e) => {
                    formik.setFieldValue("phoneNumber", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                {isLoading ? (
                  <LoadingButton
                    loading
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    type="submit"
                    sx={{
                      backgroundColor: "secondary.main",
                      // marginTop: "10px",
                    }}
                  >
                    CREATING....
                  </LoadingButton>
                ) : (
                  <ButtonGroup>
                    {
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        {buttonName}
                      </Button>
                    }
                  </ButtonGroup>
                )}
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StudentForm;
// import SendIcon from "@mui/icons-material/Send";
// import { LoadingButton } from "@mui/lab";
// import { Button, ButtonGroup, Stack } from "@mui/material";
// import { Form, Formik } from "formik";
// import { studentValidationSchema } from "../../validation/studentValidation";
// import DwInput from "../dwForm/DwInput";
// import DwSelect from "../dwForm/DwSelect";
// import { IFormValues, IStudent } from "./studentInterface";

// const StudentForm: React.FC<IFormValues> = ({
//   buttonName = "Create",
//   isLoading = false,
//   student = {},
//   formikRef = undefined,
//   onSubmit = () => {},
// }) => {
//   const initialValues: IStudent = {
//     fullName: student?.fullName || "",
//     email: student?.email || "",
//     course: student?.course || "",
//     phoneNumber: student?.phoneNumber || "",
//   };
//   const courseOptions = [
//     { value: "course1", label: "Course 1" },
//     { value: "course2", label: "Course 2" },
//     { value: "course3", label: "Course 3" },
//     // Add more courses as needed
//   ];

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         innerRef={formikRef}
//         onSubmit={onSubmit}
//         validationSchema={studentValidationSchema}
//         enableReinitialize={true}
//       >
//         {(formik) => {
//           return (
//             <Form>
//               <Stack
//                 spacing={2}
//                 alignItems="center"
//                 sx={{ marginTop: "10px", padding: "16px" }}
//               >
//                 <DwInput
//                   name="fullName"
//                   label="Full Name"
//                   type="text"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.fullName}
//                   isLoading={isLoading}
//                 />

//                 <DwInput
//                   name="email"
//                   label="Email"
//                   type="email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                   isLoading={isLoading}
//                 />

//                 <DwSelect
//                   name="course"
//                   label="Course"
//                   onChange={formik.handleChange}
//                   selectLabels={courseOptions}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.course}
//                   isLoading={isLoading}
//                 />

//                 <DwInput
//                   name="phoneNumber"
//                   label="Phone Number"
//                   type="text"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.phoneNumber}
//                   isLoading={isLoading}
//                 />

//                 {isLoading ? (
//                   <LoadingButton
//                     loading
//                     endIcon={<SendIcon />}
//                     loadingPosition="end"
//                     type="submit"
//                     sx={{ backgroundColor: "secondary.main" }}
//                   >
//                     CREATING....
//                   </LoadingButton>
//                 ) : (
//                   <ButtonGroup>
//                     <Button type="submit" variant="contained" color="secondary">
//                       {buttonName}
//                     </Button>
//                   </ButtonGroup>
//                 )}
//               </Stack>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default StudentForm;
