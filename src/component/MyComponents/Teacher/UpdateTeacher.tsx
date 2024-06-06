import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "../../../store/store";
import {
  useMyProfileQuery,
  useReadUserByIdQuery,
  useUpdateProfileMutation,
} from "../../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../../utils/utils";
import { IUser } from "../../interfaces/UserInterface";
import UpdateTeacherForm from "./UpdateTeacherForm";

const UpdateTeacher = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const navigate = useNavigate();
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  const token = useSelector((store: RootState) => store.user.token);

  const params = useParams();

  /* Reading MyProfile to Populate the form */
  const {
    isError: isErrorMyProfile,
    error: errorMyProfile,
    data: dataMyProfile,
  } = useReadUserByIdQuery(params.id);

  const profileData = dataMyProfile?.result || {};

  useEffect(() => {
    isErrorMyProfile &&
      (isFetchBaseQueryError(errorMyProfile)
        ? toast.error(getErrorMessage(errorMyProfile))
        : isSerializedError(errorMyProfile)
        ? toast.error(errorMyProfile?.message)
        : "Unknown Error");
  }, [isErrorMyProfile, errorMyProfile]);

  /* Update Profile Stuff */
  const [
    UpdateTeacher,
    {
      isError: isErrorUpdateTeacher,
      isSuccess: isSuccessUpdateTeacher,
      isLoading: isLoadingUpdateTeacher,
      error: errorUpdateTeacher,
    },
  ] = useUpdateProfileMutation();

  const submitValue = async (values: IUser) => {
    UpdateTeacher(values);
  };

  useEffect(() => {
    if (isSuccessUpdateTeacher) {
      toast.success("Profile Updated successfully", { autoClose: 3000 });
      adminToken
        ? navigate("/admin/my-profile")
        : navigate("/teachers/my-profile");
    }
  }, [isSuccessUpdateTeacher, adminToken, navigate]);

  useEffect(() => {
    if (isErrorUpdateTeacher) {
      if (isFetchBaseQueryError(errorUpdateTeacher)) {
        toast.error(getErrorMessage(errorUpdateTeacher), { autoClose: 5000 });
      } else if (isSerializedError(errorUpdateTeacher)) {
        toast.error(errorUpdateTeacher?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorUpdateTeacher, errorUpdateTeacher]);

  return (
    <>
      <UpdateTeacherForm
        buttonName="Update Profile"
        isLoading={isLoadingUpdateTeacher}
        formikRef={formikRef}
        onSubmit={submitValue}
        user={profileData}
      />
    </>
  );
};

export default UpdateTeacher;
