import { Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import RoughReactDropZone from "./RoughMuiDropzone";

interface FormValues {
  fileLink: string;
}
const RoughForm = () => {
  const initialValues = {
    fileLink: "",
    setFileLink: "",
  };

  const validationSchema = yup.object({
    fileLink: yup.string().required("Please drop a link"),
  });
  const [fileLink, setFileLink] = useState("");

  const submitValue = (values: FormValues) => {
    console.log("Link is", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitValue}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <RoughReactDropZone
              name="Drag 'n' drop some files here, or click to select files"
              fileLink={fileLink}
              onChange={(e) => {
                console.log(e.target.value)
                formik.setFieldValue("File", e.target.value);
              }}
              setFileLink={setFileLink}
            ></RoughReactDropZone>

            <ButtonGroup>
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </ButtonGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RoughForm;
