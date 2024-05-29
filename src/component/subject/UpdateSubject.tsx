import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useReadSubjectByIdQuery,
  useUpdateSubjectMutation,
} from "../../services/api/SubjectService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import SubjectForm from "./SubjectForm";
import { ISubject } from "./subjectInterface";

const UpdateSubject = () => {
  const params = useParams();
  console.log("Subject Updated");
  // const navigate = useNavigate();

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
    // navigate(`/subjects/${params.id}`);
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
    if (isSuccessUpdateSubject) toast.success("Subject Updated Successfully");
  }, [isSuccessUpdateSubject]);

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
