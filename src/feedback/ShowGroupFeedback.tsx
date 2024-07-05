import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadFeedbackByGroupIdQuery } from "../services/api/FeedbackApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../utils/utils";

const ShowGroupFeedback = () => {
  const { id } = useParams();
  const {
    isError: isErrorReadFeedbackById,
    error: errorReadFeedbackById,
    data: dataReadFeedbackById,
  } = useReadFeedbackByGroupIdQuery(id);

  console.log(
    "dataReadFeedbackByGroupId",
    dataReadFeedbackById?.result?.results
  );
  const feedbacks = dataReadFeedbackById?.result?.results;

  useEffect(() => {
    isErrorReadFeedbackById &&
      (isFetchBaseQueryError(errorReadFeedbackById)
        ? toast.error(getErrorMessage(errorReadFeedbackById))
        : isSerializedError(errorReadFeedbackById)
        ? toast.error(errorReadFeedbackById?.message)
        : "Unknown Error");
  }, [isErrorReadFeedbackById, errorReadFeedbackById]);

  return <>Hello</>;
};

export default ShowGroupFeedback;
