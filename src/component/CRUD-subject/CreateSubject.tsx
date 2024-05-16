import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useCreateSubjectMutation } from "../../services/api/SubjectService";
import SubjectForm from "./SubjectForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}
const CreateSubject = () => {
  // const navigate = useNavigate();
  const formikRef = useRef();
  // console.log("FOrmik Ref ...", typeof formikRef);

  const [
    createSubject,
    {
      isError: isErrorCreateSubject,
      isSuccess: isSuccessCreateSubject,
      isLoading: isLoadingCreateSubject,
      error: errorCreateSubject,
    },
  ] = useCreateSubjectMutation();

  const submitValue = async (values: Subject) => {
    createSubject(values);
  };

  useEffect(() => {
    if (isSuccessCreateSubject) {
      formikRef?.current?.resetForm();
      toast("Subject created successfully");
      // navigate("/subjects");
    }
  });

  useEffect(() => {
    if (isErrorCreateSubject) toast("Error:", errorCreateSubject);
  }, [isErrorCreateSubject, errorCreateSubject]);

  return (
    <>
      <div>
        {
          <SubjectForm
            buttonName="Create Subject"
            isLoading={isLoadingCreateSubject}
            formikRef={formikRef}
            onSubmit={submitValue}
          ></SubjectForm>
        }
      </div>
    </>
  );
};

export default CreateSubject;
