import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateSubjectMutation } from "../../services/api/SubjectService";
import SubjectForm from "./SubjectForm";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}
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
    isError: isErrorReadSubjectById,
    error: isErrorReadSubjectById,
    data: dataReadById,
  } = useReadSubjectByIdQuery(params.id);

  let subject = dataReadById?.result || {};
  console.log(subject);

  const submitValue = async (values: Subject) => {
    updateSubject({ id: params.id, body: values });
    navigate(`/subjects/${params.id}`);
  };

  useEffect(() => {
    if (isErrorUpdateSubject) console.log(errorUpdateSubject);
  }, [isErrorUpdateSubject, errorUpdateSubject]);

  useEffect(() => {
    if (isSuccessUpdateSubject) console.log("Subject Updated Successfully");
  }, [isSuccessUpdateSubject]);

  useEffect(() => {
    if (isErrorReadSubjectById) console.log(errorReadSubjectById.error);
  }, [isErrorReadSubjectById, errorReadSubjectById]);

  return (
    <div id="updateSubjects">
      <h3>Update Subject</h3>
      <SubjectForm
        buttonName="Update Subject"
        isLoading={isLoadingUpdateSubject}
        onSubmit={submitValue}
        // subject={}
      ></SubjectForm>
    </div>
  );
};

export default UpdateSubject;
