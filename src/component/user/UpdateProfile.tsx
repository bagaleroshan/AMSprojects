import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "../../services/api/UserService";
import { RootState } from "../../store/store";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import UpdateProfileForm from "./UpdateProfileForm";

const UpdateProfile = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const navigate = useNavigate();
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  const token = useSelector((store: RootState) => store.user.token);

  /* Reading MyProfile to Populate the form */
  const {
    isError: isErrorMyProfile,
    error: errorMyProfile,
    data: dataMyProfile,
  } = useMyProfileQuery(token);

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
    updateProfile,
    {
      isError: isErrorUpdateProfile,
      isSuccess: isSuccessUpdateProfile,
      isLoading: isLoadingUpdateProfile,
      error: errorUpdateProfile,
    },
  ] = useUpdateProfileMutation();

  const submitValue = async (values: IUser) => {
    updateProfile(values);
  };

  useEffect(() => {
    if (isSuccessUpdateProfile) {
      toast.success("Profile Updated successfully", { autoClose: 3000 });
      adminToken
        ? navigate("/admin/my-profile")
        : navigate("/teachers/my-profile");
    }
  }, [isSuccessUpdateProfile, adminToken, navigate]);

  useEffect(() => {
    if (isErrorUpdateProfile) {
      if (isFetchBaseQueryError(errorUpdateProfile)) {
        toast.error(getErrorMessage(errorUpdateProfile), { autoClose: 5000 });
      } else if (isSerializedError(errorUpdateProfile)) {
        toast.error(errorUpdateProfile?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorUpdateProfile, errorUpdateProfile]);

  return (
    <>
      <UpdateProfileForm
        buttonName="Update Profile"
        isLoading={isLoadingUpdateProfile}
        formikRef={formikRef}
        onSubmit={submitValue}
        user={profileData}
      />
    </>
  );
};

export default UpdateProfile;
