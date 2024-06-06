import { useEffect, useRef } from "react";
import { FormikProps } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateSubjectMutation } from "../../services/api/SubjectService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import SubjectForm from "./SubjectForm";
import { ISubject } from "../interfaces/SubjectInterface";
import { useNavigate } from "react-router-dom";

const CreateSubject = () => {
  const formikRef = useRef<FormikProps<ISubject> | null>(null);
  const navigate = useNavigate();
  const [
    createSubject,
    {
      isError: isErrorCreateSubject,
      isSuccess: isSuccessCreateSubject,
      isLoading: isLoadingCreateSubject,
      error: errorCreateSubject,
    },
  ] = useCreateSubjectMutation();

  const submitValue = async (values: ISubject) => {
    createSubject(values);
  };

  useEffect(() => {
    if (isSuccessCreateSubject) {
      formikRef.current?.resetForm();
      toast.success("Subject created successfully");
      navigate("/admin/forms/subjects");
    }
  });

  useEffect(() => {
    isErrorCreateSubject &&
      (isFetchBaseQueryError(errorCreateSubject)
        ? toast.error(getErrorMessage(errorCreateSubject))
        : isSerializedError(errorCreateSubject)
        ? toast.error(errorCreateSubject?.message)
        : "Unknown Error");
  }, [isErrorCreateSubject, errorCreateSubject]);

  return (
    <>
      <SubjectForm
        buttonName="Create Subject"
        isLoading={isLoadingCreateSubject}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateSubject;
