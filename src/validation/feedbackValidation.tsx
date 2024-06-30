import * as Yup from "yup";

export const feedbackValidationSchema = Yup.object().shape({
  onTime: Yup.number()
    .required("onTime field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  hasDeliveryPower: Yup.number()
    .required("hasDeliveredPower field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  hasSkills: Yup.number()
    .required("hasSkills field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  hasInteraction: Yup.number()
    .required("hasInteraction field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  isClassFretful: Yup.number()
    .required("isClassFretful field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  isClassComfortable: Yup.number()
    .required("isClassComfort field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  hasClearConversation: Yup.number()
    .required("hasClearConversation field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  doesInternetWork: Yup.number()
    .required("doesInternetWork field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
  feelChangeOnYourself: Yup.number()
    .required("feelChangeOnYourself field is required")
    .min(1, "Please rate this field")
    .max(5, "Please rate this field"),
});
