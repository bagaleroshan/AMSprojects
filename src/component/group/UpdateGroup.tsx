import { toast } from "react-toastify";
import GroupForm from "./GroupForm";
import { useEffect, useState } from "react";
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
  const [initialGroup, setInitialGroup] = useState<IGroup | null>(null);

  const [
    updateGroup,
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

  // const group = dataViewSpecific?.result;
  console.log(dataViewSpecific?.result);

  const submitValue = async (values: IGroup) => {
    updateGroup({ id: params.id, body: values });
  };
  /* Converitng string to date */
  useEffect(() => {
    if (dataViewSpecific?.result) {
      const groupWithDate = {
        ...dataViewSpecific.result,
        // Assuming the date field in your group object is named 'dateField'
        startTime: new Date(dataViewSpecific.result.startTime),
        endTime: new Date(dataViewSpecific.result.endTime),
      };
      setInitialGroup(groupWithDate);
    }
  }, [dataViewSpecific]);

  useEffect(() => {
    if (isErrorUpdateGroup) {
      if (isFetchBaseQueryError(errorUpdateGroup)) {
        toast.error(getErrorMessage(errorUpdateGroup));
      } else if (isSerializedError(errorUpdateGroup)) {
        toast.error(errorUpdateGroup.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorUpdateGroup, errorUpdateGroup]);

  useEffect(() => {
    if (isSuccessUpdateGroup) {
      toast.success("Group Updated Successfully");
      navigate("/admin/groups");
    }
  }, [isSuccessUpdateGroup, navigate]);

  useEffect(() => {
    if (isErrorViewSpecific) {
      if (isFetchBaseQueryError(errorViewSpecific)) {
        toast.error(getErrorMessage(errorViewSpecific));
      } else if (isSerializedError(errorViewSpecific)) {
        toast.error(errorViewSpecific.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorViewSpecific, errorViewSpecific]);

  return (
    <div>
      {initialGroup && (
        <GroupForm
          buttonName="Update Group"
          isLoading={isLoadingUpdateGroup}
          onSubmit={submitValue}
          group={initialGroup}
        />
      )}
    </div>
  );
};

export default UpdateGroup;
