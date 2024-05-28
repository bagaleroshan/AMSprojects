import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "./UserForm";
import { useCreateUserMutation } from "../../services/api/UserService";

interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}
const CreateRegister = () => {
  // const navigate = useNavigate();
  const formikRef = useRef<null>(null);
  // console.log("FOrmik Ref ...", formikRef);

  const [
    createUser,
    {
      isError: isErrorCreateUser,
      isSuccess: isSuccessCreateUser,
      isLoading: isLoadingCreateUser,
      error: errorCreateUser,
      data:createData
    },
  ] = useCreateUserMutation();

  const submitValue = async (values: Subject) => {
    createUser(values);
  };

  useEffect(() => {
    if (isSuccessCreateUser) {
      formikRef?.current?.resetForm();
      toast("User Register created successfully");
      // navigate("/subjects");
    }
  });

  useEffect(() => {
    if (isErrorCreateUser) toast.error(errorCreateUser.data.message);
  }, [isErrorCreateUser, errorCreateUser]);

  return (
    <>
      <div>
        {
          <UserForm
          
            buttonName="Create Subject"
            isLoading={isLoadingCreateUser}
            formikRef={formikRef}
            onSubmit={submitValue}
          ></UserForm>
        }
      </div>
    </>
  );
};

export default CreateRegister;
