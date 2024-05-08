import { Form, Formik } from "formik";
import DateAndTime from "./DateAndTime";
import * as yup from "yup";
import { Button, ButtonGroup } from "@mui/material";

interface FormValues {
  dob: Date;
}
const RoughForm = () => {
  const initialValues = {
    dob: new Date(),
  };

  const validationSchema = yup.object({
    dob: yup.date().required("Please select your date of birth"),
  });

  const submitValue = (values: FormValues) => {
    console.log("Date is", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitValue}
      validationSchema={validationSchema}
    >
      {(formik) => {
        // console.log("Formik", formik);
        return (
          <Form>
            <DateAndTime
              name="dob"
              label="D.O.B"
              // value={formik.values.dob}
              onChange={(date) => {
                // console.log("Date is", date.$d);
                formik.setFieldValue("dob", date.$d);
              }}
            ></DateAndTime>

            <ButtonGroup>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                // onClick={() => alert("Button Submitted")}
              >
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
