import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useReadFeedbackQuery } from "../../services/api/FeedbackApi";
import { showSuccessToast } from "../../muiModals/toastConfig";
import { useNavigate } from "react-router-dom";

interface ViewFeedbackProps {
  groupId: string;
}

const ViewFeedback: React.FC<ViewFeedbackProps> = ({ groupId }) => {
  const navigate = useNavigate();

  const {
    data: feedbackData,
    error: errorViewFeedback,
    isError: isErrorViewFeedback,
    isLoading: isLoadingViewFeedback,
    isSuccess: isSuccessViewFeedback,
    refetch: refetchFeedback,
  } = useReadFeedbackQuery(groupId);

  useEffect(() => {
    if (isSuccessViewFeedback) {
      showSuccessToast("Feedback data fetched successfully.");
      navigate(`/seeFeedback/${groupId}`);
    }
  }, [isSuccessViewFeedback, navigate, groupId]);

  useEffect(() => {
    if (isErrorViewFeedback) {
      toast.error("Failed to fetch feedback. Please try again.");
    }
  }, [isErrorViewFeedback, errorViewFeedback]);

  const handleViewFeedback = () => {
    refetchFeedback();
  };

  return (
    <Button
      onClick={handleViewFeedback}
      disabled={isLoadingViewFeedback}
      variant="contained"
    >
      {isLoadingViewFeedback ? "Fetching..." : "View Feedback"}
    </Button>
  );
};

export default ViewFeedback;
