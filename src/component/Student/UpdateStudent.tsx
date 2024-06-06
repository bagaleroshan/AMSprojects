import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useReadStudentByIdQuery,
  useUpdateStudentMutation,
} from "../../services/api/StudentApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IStudent } from "../interfaces/StudentInterface";
import StudentForm from "./StudentForm";

const UpdateStudent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [
    updateStudent,
    {
      isError: isErrorUpdateStudent,
      isSuccess: isSuccessUpdateStudent,
      isLoading: isLoadingUpdateStudent,
      error: errorUpdateStudent,
    },
  ] = useUpdateStudentMutation();

  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadStudentByIdQuery(params.id);

  const student = dataViewSpecific?.result || {};

  const submitValue = async (values: IStudent) => {
    updateStudent({ id: params.id, body: values });
  };

  useEffect(() => {
    isErrorUpdateStudent &&
      (isFetchBaseQueryError(errorUpdateStudent)
        ? toast.error(getErrorMessage(errorUpdateStudent))
        : isSerializedError(errorUpdateStudent)
        ? toast.error(errorUpdateStudent?.message)
        : "Unknown Error");
  }, [isErrorUpdateStudent, errorUpdateStudent]);

  useEffect(() => {
    if (isSuccessUpdateStudent) {
      toast.success("Student Updated Successfully");
      navigate("/admin/forms/students");
    }
  }, [isSuccessUpdateStudent, navigate]);

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
      <StudentForm
        buttonName="Update Student"
        isLoading={isLoadingUpdateStudent}
        onSubmit={submitValue}
        student={student}
      ></StudentForm>
    </div>
  );
};

export default UpdateStudent;
