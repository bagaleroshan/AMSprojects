import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Snackbar, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import DwInput from "../dwForm/DwInput";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}

interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  onSubmit: (data: Subject) => void;
  subject?: Subject;
}

const SubjectForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  onSubmit = () => {},
  subject = {},
}) => {
  const initialValues: Subject = {
    subjectName: subject.subjectName || "",
    subjectCode: subject.subjectCode || "",
    numberOfClasses: subject.numberOfClasses || 0,
  };

  const validationSchema = yup.object({
    subjectName: yup
      .string()
      .min(2, "Subject name should be of minimum 2 characters length")
      .required("Subject name is required"),
    subjectCode: yup.string().required("Subject Code is required"),
    numberOfClasses: yup
      .number()
      .min(1, "You should atleast have 1 classes")
      .required("Please choose the number of classes"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
                  name="subjectName"
                  label="Subject Name"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("subjectName", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="subjectCode"
                  label="Subject Code"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("subjectCode", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="numberOfClasses"
                  label="No.of Classes"
                  type="number"
                  onChange={(e) => {
                    formik.setFieldValue("numberOfClasses", e.target.value);
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

export default SubjectForm;
