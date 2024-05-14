import { useNavigate } from "react-router-dom";
import { useCreateSubjectMutation } from "../../services/api/SubjectService";
import SubjectForm from "../CRUD-subject/SubjectForm";
import { useEffect } from "react";

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

  const submitValue = async (values) => {
    createSubject(values);
    navigate("/subjects");
  };

  useEffect(() => {
    if (isSuccessCreateSubject) console.log("Product Created Successfully");
  }, [isSuccessCreateSubject]);

  useEffect(() => {
    if (isErrorCreateSubject) console.log("***", errorCreateSubject.error);
  }, [isErrorCreateSubject, errorCreateSubject]);

  return (
    <>
      <div>
        <SubjectForm
          buttonName="Create Subject"
          isLoading={isLoadingCreateSubject}
          onSubmit={submitValue}
          // subject={}
        ></SubjectForm>
      </div>
    </>
  );
};

export default CreateSubject;
