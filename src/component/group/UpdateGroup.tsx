import { toast } from "react-toastify";
import GroupForm from "./GroupForm";
import { useEffect } from "react";
import { IGroup } from "../interfaces/GroupInterface";

import { useNavigate, useParams } from "react-router-dom";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import {
  useReadGroupByIdQuery,
  useUpdateGroupMutation,
} from "../../services/api/GroupService";

const UpdateGroup = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [
    updateSubject,
    {
      isError: isErrorUpdateGroup,
      isSuccess: isSuccessUpdateGroup,
      isLoading: isLoadingUpdateGroup,
      error: errorUpdateGroup,
    },
  ] = useUpdateGroupMutation();

  const {
    isError: isErrorViewSpecific,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(params.id);

  const Group = dataViewSpecific?.result || {};

  const submitValue = async (values: IGroup) => {
    updateSubject({ id: params.id, body: values });
  };

  useEffect(() => {
    isErrorUpdateGroup &&
      (isFetchBaseQueryError(errorUpdateGroup)
        ? toast.error(getErrorMessage(errorUpdateGroup))
        : isSerializedError(errorUpdateGroup)
        ? toast.error(errorUpdateGroup?.message)
        : "Unknown Error");
  }, [isErrorUpdateGroup, errorUpdateGroup]);

  useEffect(() => {
    if (isSuccessUpdateGroup) {
      toast.success("Group Updated Successfully");
      navigate("/admin/Groups");
    }
  });

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
      <GroupForm
        buttonName="Update Group"
        isLoading={isLoadingUpdateGroup}
        onSubmit={submitValue}
        group={Group}
      />
    </div>
  );
};

export default UpdateGroup;
