import { useEffect } from "react";
import { resetForm } from "../../features/subjectSlice";
import { useCreateSubjectMutation } from "../../services/api/SubjectService";
import SubjectForm from "./SubjectForm";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}
const CreateSubject = () => {
  const [
    createSubject,
    {
      isError: isErrorCreateSubject,
      isSuccess: isSuccessCreateSubject,
      isLoading: isLoadingCreateSubject,
      error: errorCreateSubject,
    },
  ] = useCreateSubjectMutation();

  const navigate = useNavigate();
  const submitValue = async (values: Subject) => {
    createSubject(values);
  };

  useEffect(() => {
    if (isSuccessCreateSubject) {
      navigate("/subjects");
    }
  });

  useEffect(() => {
    if (isErrorCreateSubject) console.log("***", errorCreateSubject.error);

    // toast("Error:", errorCreateSubject);
  }, [isErrorCreateSubject, errorCreateSubject]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div>
        {
          <SubjectForm
            buttonName="Create Subject"
            isLoading={isLoadingCreateSubject}
            onSubmit={submitValue}
          ></SubjectForm>
        }
      </div>
    </>
  );
};

export default CreateSubject;
