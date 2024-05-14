import { Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import DwInput from "../dwForm/DwInput";

interface Subject {
  subjectName: string;
  subjectCode: string;
  noOfClasses: number;
}

interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  onSubmit: (data: FormData) => void;
  subject: Subject;
}

const SubjectForm: React.FC<IFormValues> = ({
  buttonName = "Create Product",
  isLoading = false,
  onSubmit = () => {},
  subject = {},
}) => {
  const initialValues: Subject = {
    subjectName: subject.subjectName || "",
    subjectCode: subject.subjectCode || "",
    noOfClasses: subject.noOfClasses || 0,
  };

  const validationSchema = yup.object({
    subjectName: yup
      .string()
      .min(2, "Subject name should be of minimum 2 characters length")
      .required("Full name is required"),
    subjectCode: yup.string().required("Subject Code is required"),
    noOfClasses: yup.number().required("Please choose the number of classes"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <DwInput
                name="subjectName"
                label="Subject Name"
                type="text"
                onChange={(e) => {
                  formik.setFieldValue("subjectName", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="subjectCode"
                label="Subject Code"
                type="text"
                onChange={(e) => {
                  formik.setFieldValue("subjectCode", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="noOfClasses"
                label="No.of Classes"
                type="number"
                onChange={(e) => {
                  formik.setFieldValue("noOfClasses", e.target.value);
                }}
              ></DwInput>

              <ButtonGroup>
                <Button type="submit" variant="contained" color="secondary">
                  {isLoading ? "...loading" : buttonName}
                </Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SubjectForm;
