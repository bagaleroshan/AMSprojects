import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateStudentMutation } from "../../services/api/StudentApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IStudent } from "../interfaces/StudentInterface";
import StudentForm from "./StudentForm";

const CreateStudent = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IStudent> | null>(null);

  const [
    CreateStudent,
    {
      isError: isErrorCreateStudent,
      isSuccess: isSuccessCreateStudent,
      isLoading: isLoadingCreateStudent,
      error: errorCreateStudent,
    },
  ] = useCreateStudentMutation();

  const submitValue = async (values: IStudent) => {
    CreateStudent(values);
  };

  useEffect(() => {
    if (isSuccessCreateStudent) {
      formikRef.current?.resetForm();
      toast.success("Student created successfully");
      navigate("/admin/forms/students");
    }
  });

  useEffect(() => {
    isErrorCreateStudent &&
      (isFetchBaseQueryError(errorCreateStudent)
        ? toast.error(getErrorMessage(errorCreateStudent))
        : isSerializedError(errorCreateStudent)
        ? toast.error(errorCreateStudent?.message)
        : "Unknown Error");
  }, [isErrorCreateStudent, errorCreateStudent]);

  return (
    <>
      <StudentForm
        buttonName="Create Student"
        isLoading={isLoadingCreateStudent}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateStudent;
