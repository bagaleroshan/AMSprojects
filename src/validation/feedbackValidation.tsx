import * as Yup from "yup";

export const feedbackValidationSchema = Yup.object().shape({
  onTime: Yup.number()
    .required("onTime field is required")
    .min(1, "Please rate this field"),
  hasDeliveryPower: Yup.number()
    .required("hasDeliveredPower field is required")
    .min(1, "Please rate this field"),
  hasSkills: Yup.number()
    .required("hasSkills field is required")
    .min(1, "Please rate this field"),
  hasInteraction: Yup.number()
    .required("hasInteraction field is required")
    .min(1, "Please rate this field"),
  isClassFruitful: Yup.number()
    .required("isClassFruitful field is required")
    .min(1, "Please rate this field"),
  isClassRoomComfortable: Yup.number()
    .required("isClassComfort field is required")
    .min(1, "Please rate this field"),
  hasClearConversation: Yup.number()
    .required("hasClearConversation field is required")
    .min(1, "Please rate this field"),
  doesInternetWork: Yup.number()
    .required("doesInternetWork field is required")
    .min(1, "Please rate this field"),
  feelChangeOnYourself: Yup.number()
    .required("feelChangeOnYourself field is required")
    .min(1, "Please rate this field"),
  description: Yup.string()
    .required("Please provide your thoughts")
    .min(10, "Thoughts must be at least 10 characters"),
});
