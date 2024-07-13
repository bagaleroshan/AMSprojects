import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useRequestFeedbackMutation } from "../services/api/FeedbackApi";
import { showSuccessToast } from "../muiModals/toastConfig";
import { RequestFeedbackProps } from "../component/interfaces/FeedbackInterface";

const RequestFeedback: React.FC<RequestFeedbackProps> = ({ groupId }) => {
  const [
    requestFeedback,
    {
      isError: isErrorRequestFeedback,
      isSuccess: isSuccessRequestFeedback,
      isLoading: isLoadingRequestFeedback,
      error: errorRequestFeedback,
    },
  ] = useRequestFeedbackMutation();

  useEffect(() => {
    if (isSuccessRequestFeedback) {
      showSuccessToast("Feedback request sent successfully.");
    }
  }, [isSuccessRequestFeedback]);

  useEffect(() => {
    if (isErrorRequestFeedback) {
      toast.error("Failed to request feedback. Please try again.");
    }
  }, [isErrorRequestFeedback, errorRequestFeedback]);

  const handleRequestFeedback = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event propagation to parent elements
    requestFeedback({ groupId });
  };

  return (
    <Button
      onClick={handleRequestFeedback}
      disabled={isLoadingRequestFeedback}
      variant="contained"
    >
      {isLoadingRequestFeedback ? "Requesting..." : "Request Feedback"}
    </Button>
  );
};

export default RequestFeedback;
