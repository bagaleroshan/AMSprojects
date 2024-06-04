import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { validationSchema } from "../../validation/subjectValidation";
import DwInput from "../dwComponents/DwInput";
import { IFormValues, ISubject } from "../interfaces/SubjectInterface";

const SubjectForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  subject = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const initialValues: ISubject = {
    subjectName: subject?.subjectName || "",
    subjectCode: subject?.subjectCode || "",
    numberOfClasses: subject?.numberOfClasses || "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
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
                      backgroundColor: "primary.main",
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
