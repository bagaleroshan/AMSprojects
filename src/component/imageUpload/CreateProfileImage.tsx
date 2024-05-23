import { Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import AddProfileImage from "./AddProfileImage";
import { IFormValues } from "./IProfileImageInterface";

const CreateProfileImage = () => {
  const initialValues = {
    profileImage: "",
  };

  const submitValue = (values: IFormValues) => {
    console.log("Value", values);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={submitValue}>
        {(formik) => {
          return (
            <Form>
              <AddProfileImage
                name="Profile Image"
                formik={formik}
              ></AddProfileImage>

              <ButtonGroup>
                <Button type="submit" variant="contained" color="secondary">
                  Submit
                </Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProfileImage;
