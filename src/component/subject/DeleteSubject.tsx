import { useEffect } from "react";
import { useDeleteSubjectMutation } from "../../services/api/SubjectService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { showSuccessToast } from "../../muiModals/toastConfig";

const DeleteSubject = () => {
  const navigate = useNavigate();
  const [
    deleteSubject,
    {
      isError: isErrorDeleteSubject,
      isSuccess: isSuccessDeleteSubject,
      //   isLoading: isLoadingDeleteSubject,
      error: errorDeleteSubject,
    },
  ] = useDeleteSubjectMutation(); //Mutation gives array

  useEffect(() => {
    if (isSuccessDeleteSubject) {
      showSuccessToast("Subject deleted successfully");
      navigate("/admin/forms/subjects");
    }
  });

  useEffect(() => {
    isErrorDeleteSubject &&
      (isFetchBaseQueryError(errorDeleteSubject)
        ? toast.error(getErrorMessage(errorDeleteSubject))
        : isSerializedError(errorDeleteSubject)
        ? toast.error(errorDeleteSubject?.message)
        : "Unknown Error");
  }, [isErrorDeleteSubject, errorDeleteSubject]);

  return <div></div>;
};

export default DeleteSubject;
