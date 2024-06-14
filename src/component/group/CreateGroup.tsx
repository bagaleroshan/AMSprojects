import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { IGroup } from "../interfaces/GroupInterface";
import { useEffect, useRef } from "react";
import { useCreateGroupMutation } from "../../services/api/GroupService";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import GroupForm from "./GroupForm";

const CreateGroup = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IGroup> | null>(null);

  const [
    CreateGroup,
    {
      isError: isErrorCreateGroup,
      isSuccess: isSuccessCreateGroup,
      isLoading: isLoadingCreateGroup,
      error: errorCreateGroup,
    },
  ] = useCreateGroupMutation();

  const submitValue = async (values: IGroup) => {
    console.log("*******************", values);
    CreateGroup(values);
    console.log("jenis*********************");
  };

  useEffect(() => {
    if (isSuccessCreateGroup) {
      formikRef.current?.resetForm();
      toast.success("Group created successfully");
      navigate("/admin/groups");
    }
  });

  useEffect(() => {
    isErrorCreateGroup &&
      (isFetchBaseQueryError(errorCreateGroup)
        ? toast.error(getErrorMessage(errorCreateGroup))
        : isSerializedError(errorCreateGroup)
        ? toast.error(errorCreateGroup?.message)
        : "Unknown Error");
  }, [isErrorCreateGroup, errorCreateGroup]);

  return (
    <>
      <GroupForm
        buttonName="Create Group"
        isLoading={isLoadingCreateGroup}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateGroup;
