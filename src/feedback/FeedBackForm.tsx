import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { IFeedback } from "../component/interfaces/FeedbackInterface";
import { showSuccessToast } from "../muiModals/toastConfig";
import {
  useCreateFeedbackMutation,
  useRequestFeedbackMutation,
} from "../services/api/FeedbackApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { useRequestFeedbackMutation } from "../../services/api/FeedbackApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
} from "../utils/utils";
import { feedbackValidationSchema } from "../validation/feedbackValidation";

const FeedbackForm: React.FC = () => {
  const initialFormValues: IFeedback = {
    onTime: 0,
    hasDeliveryPower: 0,
    hasSkills: 0,
    hasInteraction: 0,
    isClassFretful: 0,
    isClassComfortable: 0,
    hasClearConversation: 0,
    doesInternetWork: 0,
    feelChangeOnYourself: 0,
    thoughts: "",
  };

  const [
    createFeedback,
    {
      isError: isErrorSubmitFeedback,
      isSuccess: isSuccessSubmitFeedback,
      isLoading: isLoadingSubmitFeedback,
      error: errorSubmitFeedback,
    },
  ] = useCreateFeedbackMutation();

  const handleSubmit = async (values: IFeedback) => {
    createFeedback(values);
  };

  useEffect(() => {
    if (isSuccessSubmitFeedback) {
      showSuccessToast("Feedback submitted successfully.");
    }
  }, [isSuccessSubmitFeedback]);

  useEffect(() => {
    if (isErrorSubmitFeedback) {
      isFetchBaseQueryError(errorSubmitFeedback)
        ? toast.error(getErrorMessage(errorSubmitFeedback))
        : isSerializedError(errorSubmitFeedback)
        ? toast.error(errorSubmitFeedback?.message)
        : toast.error("Unknown Error");
    }
  }, [isErrorSubmitFeedback, errorSubmitFeedback]);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={feedbackValidationSchema}
      validateOnBlur={true}
    >
      {(formik: FormikProps<IFeedback>) => (
        <Form>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Feedback Form
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "blue",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              />
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {[
                    { name: "onTime", label: "On Time" },
                    { name: "hasDeliveryPower", label: "Has Delivery Power" },
                    { name: "hasSkills", label: "Has Skills" },
                    { name: "hasInteraction", label: "Has Interaction" },
                    { name: "isClassFretful", label: "Is Class Fretful" },
                    {
                      name: "isClassRoomComfortable",
                      label: "Is Class Comfortable",
                    },
                    {
                      name: "hasClearConversation",
                      label: "Has Clear Conversation",
                    },
                    { name: "doesInternetWork", label: "Does Internet Work" },
                    {
                      name: "feelChangeOnYourself",
                      label: "Feel Change On Yourself",
                    },
                  ].map((item) => (
                    <Grid item xs={12} key={item.name}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched[item.name as keyof IFeedback] &&
                          Boolean(formik.errors[item.name as keyof IFeedback])
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <FormLabel sx={{ marginRight: 2 }}>
                            {item.label}
                          </FormLabel>
                          <Rating
                            name={item.name}
                            value={formik.values[item.name as keyof IFeedback]}
                            onChange={(event, newValue) => {
                              console.log(
                                "item.name",
                                item.name + "Value",
                                newValue
                              );
                              formik.setFieldValue(item.name, newValue);
                            }}
                            precision={1}
                          />
                        </Box>
                        {formik.touched[item.name as keyof IFeedback] &&
                          formik.errors[item.name as keyof IFeedback] && (
                            <FormHelperText>
                              {formik.errors[item.name as keyof IFeedback]}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched.thoughts &&
                        Boolean(formik.errors.thoughts)
                      }
                    >
                      <FormLabel>Your Thoughts</FormLabel>
                      <ReactQuill
                        value={formik.values.thoughts}
                        onChange={(content) =>
                          formik.setFieldValue("thoughts", content)
                        }
                        onBlur={() => formik.setFieldTouched("thoughts", true)}
                        theme="snow"
                      />
                      {formik.touched.thoughts && formik.errors.thoughts && (
                        <FormHelperText>
                          {formik.errors.thoughts}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                          !formik.isValid ||
                          formik.isSubmitting ||
                          isLoadingSubmitFeedback
                        }
                      >
                        {isLoadingSubmitFeedback ? "Submitting..." : "Submit"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default FeedbackForm;
