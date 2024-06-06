import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useReadSubjectByIdQuery,
  useUpdateSubjectMutation,
} from "../../services/api/SubjectService";
import SubjectForm from "./SubjectForm";
import { ISubject } from "../interfaces/SubjectInterface";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const UpdateSubject = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [
    updateSubject,
    {
      isError: isErrorUpdateSubject,
      isSuccess: isSuccessUpdateSubject,
      isLoading: isLoadingUpdateSubject,
      error: errorUpdateSubject,
    },
  ] = useUpdateSubjectMutation();

  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadSubjectByIdQuery(params.id);

  const subject = dataViewSpecific?.result || {};

  const submitValue = async (values: ISubject) => {
    updateSubject({ id: params.id, body: values });
  };

  useEffect(() => {
    isErrorUpdateSubject &&
      (isFetchBaseQueryError(errorUpdateSubject)
        ? toast.error(getErrorMessage(errorUpdateSubject))
        : isSerializedError(errorUpdateSubject)
        ? toast.error(errorUpdateSubject?.message)
        : "Unknown Error");
  }, [isErrorUpdateSubject, errorUpdateSubject]);

  useEffect(() => {
    if (isSuccessUpdateSubject) {
      toast.success("Subject Updated Successfully");
      navigate(`/admin/forms/subjects`);
    }
  });

  useEffect(() => {
    isErrorViewSpecific &&
      (isFetchBaseQueryError(errorViewSpecific)
        ? toast.error(getErrorMessage(errorViewSpecific))
        : isSerializedError(errorViewSpecific)
        ? toast.error(errorViewSpecific?.message)
        : "Unknown Error");
  }, [isErrorViewSpecific, errorViewSpecific]);

  return (
    <div>
      <SubjectForm
        buttonName="Update Subject"
        isLoading={isLoadingUpdateSubject}
        onSubmit={submitValue}
        subject={subject}
      ></SubjectForm>
    </div>
  );
};

export default UpdateSubject;
