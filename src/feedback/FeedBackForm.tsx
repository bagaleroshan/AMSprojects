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
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IFeedback } from "../component/interfaces/FeedbackInterface";
import { useCreateFeedbackMutation } from "../services/api/FeedbackApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../utils/utils";
import { feedbackValidationSchema } from "../validation/feedbackValidation";

const FeedbackForm: React.FC = () => {
  const initialFormValues: IFeedback = {
    onTime: 5,
    hasDeliveryPower: 5,
    hasSkills: 5,
    hasInteraction: 5,
    isClassFruitful: 5,
    isClassRoomComfortable: 5,
    hasClearConversation: 5,
    doesInternetWork: 5,
    feelChangeOnYourself: 5,
    description: "",
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
  const navigate = useNavigate();

  const [data] = useSearchParams();
  const token = data.get("token") || "";

  const handleSubmit = (values: IFeedback) => {
    createFeedback({ body: values, token });
  };

  useEffect(() => {
    if (isSuccessSubmitFeedback) {
      navigate("/feedback-taken");
    }
  }, [isSuccessSubmitFeedback, navigate]);

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
                    { name: "isClassFruitful", label: "Is Class Fruitful" },
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
                            value={
                              formik.values[
                                item.name as keyof IFeedback
                              ] as number
                            }
                            onChange={(_, newValue: number | null) => {
                              if (newValue !== null) {
                                formik.setFieldValue(item.name, newValue);
                              }
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
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                    >
                      <FormLabel>Your Thoughts</FormLabel>
                      <ReactQuill
                        value={formik.values.description}
                        onChange={(content) => {
                          formik.setFieldValue("description", content);
                        }}
                        onBlur={() =>
                          formik.setFieldTouched("description", true)
                        }
                        theme="snow"
                        placeholder="Don't mention your name and info in here......"
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <FormHelperText>
                            {formik.errors.description}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button type="submit" variant="contained" color="primary">
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
