// import SendIcon from "@mui/icons-material/Send";
// import { LoadingButton } from "@mui/lab";
// import { Button, ButtonGroup, Stack } from "@mui/material";
// import { Form, Formik } from "formik";
// import { Ref } from "react-hook-form";
// import * as yup from "yup";
// import DwInput from "../dwForm/DwInput";

// interface Subject {
//   subjectName: string;
//   subjectCode: string;
//   numberOfClasses: number | string;
// }

// interface IFormValues {
//   buttonName: string;
//   isLoading: boolean;
//   formikRef: (Ref<Subject<Subject>> | undefined) & object;
//   onSubmit: (data: Subject) => void;
//   subject?: Subject;
// }

// const SubjectForm: React.FC<IFormValues> = ({
//   buttonName = "Create",
//   isLoading = false,
//   formikRef = {},
//   onSubmit = () => {},
//   subject = {},
// }) => {
//   const initialValues: Subject = {
//     subjectName: subject.subjectName || "",
//     subjectCode: subject.subjectCode || "",
//     numberOfClasses: subject.numberOfClasses || "",
//   };

//   const validationSchema = yup.object({
//     subjectName: yup
//       .string()
//       .min(3)
//       .max(100)
//       .required("Subject name is required"),
//     subjectCode: yup
//       .string()
//       .min(3)
//       .max(30)
//       .required("Subject Code is required"),
//     numberOfClasses: yup
//       .number()
//       .min(10, "You should at least have 10 classes")
//       .max(500)
//       .required("Please choose the number of classes"),
//   });

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         innerRef={formikRef}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
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
//                   name="subjectName"
//                   label="Subject Name"
//                   type="text"
//                   onChange={(e) => {
//                     formik.setFieldValue("subjectName", e.target.value);
//                   }}
//                   isLoading={isLoading}
//                 ></DwInput>

//                 <DwInput
//                   name="subjectCode"
//                   label="Subject Code"
//                   type="text"
//                   onChange={(e) => {
//                     formik.setFieldValue("subjectCode", e.target.value);
//                   }}
//                   isLoading={isLoading}
//                 ></DwInput>

//                 <DwInput
//                   name="numberOfClasses"
//                   label="No.of Classes"
//                   type="number"
//                   onChange={(e) => {
//                     formik.setFieldValue("numberOfClasses", e.target.value);
//                   }}
//                   isLoading={isLoading}
//                 ></DwInput>

//                 {isLoading ? (
//                   <LoadingButton
//                     loading
//                     endIcon={<SendIcon />}
//                     loadingPosition="end"
//                     type="submit"
//                     sx={{
//                       backgroundColor: "secondary.main",
//                       // marginTop: "10px",
//                     }}
//                   >
//                     CREATING....
//                   </LoadingButton>
//                 ) : (
//                   <ButtonGroup>
//                     {
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="secondary"
//                       >
//                         {buttonName}
//                       </Button>
//                     }
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

// export default SubjectForm;
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as yup from "yup";
import DwInput from "../dwForm/DwInput";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number | string;
}

interface IFormValues {
  buttonName?: string;
  isLoading?: boolean;
  formikRef?: React.Ref<FormikProps<Subject>>;
  onSubmit: (data: Subject) => void;
  subject?: Partial<Subject>;
}

const SubjectForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  formikRef,
  onSubmit,
  subject = {},
}) => {
  const initialValues: Subject = {
    subjectName: subject.subjectName || "",
    subjectCode: subject.subjectCode || "",
    numberOfClasses: subject.numberOfClasses || "",
  };

  const validationSchema = yup.object({
    subjectName: yup
      .string()
      .min(3, "Subject name must be at least 3 characters")
      .max(100, "Subject name must be less than 100 characters")
      .required("Subject name is required"),
    subjectCode: yup
      .string()
      .min(3, "Subject code must be at least 3 characters")
      .max(30, "Subject code must be less than 30 characters")
      .required("Subject Code is required"),
    numberOfClasses: yup
      .number()
      .min(10, "You should at least have 10 classes")
      .max(500, "You should have at most 500 classes")
      .required("Please choose the number of classes"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{ marginTop: "10px", padding: "16px" }}
            >
              <DwInput
                name="subjectName"
                label="Subject Name"
                type="text"
                onChange={(e) =>
                  formik.setFieldValue("subjectName", e.target.value)
                }
                isLoading={isLoading}
              />

              <DwInput
                name="subjectCode"
                label="Subject Code"
                type="text"
                onChange={(e) =>
                  formik.setFieldValue("subjectCode", e.target.value)
                }
                isLoading={isLoading}
              />

              <DwInput
                name="numberOfClasses"
                label="No. of Classes"
                type="number"
                onChange={(e) =>
                  formik.setFieldValue("numberOfClasses", e.target.value)
                }
                isLoading={isLoading}
              />

              {isLoading ? (
                <LoadingButton
                  loading
                  endIcon={<SendIcon />}
                  loadingPosition="end"
                  type="submit"
                  sx={{ backgroundColor: "secondary.main" }}
                >
                  CREATING....
                </LoadingButton>
              ) : (
                <ButtonGroup>
                  <Button type="submit" variant="contained" color="secondary">
                    {buttonName}
                  </Button>
                </ButtonGroup>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubjectForm;
