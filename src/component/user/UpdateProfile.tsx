import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import UpdateProfileForm from "./UpdateProfileForm";
import { IUser } from "./UserInterface";

const UpdateProfile = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const navigate = useNavigate();

  /* Reading MyProfile to Populate the form */
  const {
    isError: isErrorMyProfile,
    error: errorMyProfile,
    data: dataMyProfile,
  } = useMyProfileQuery({});

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
    // console.log("Update Profile Values:", values);
    updateProfile(values);
  };

  useEffect(() => {
    if (isSuccessUpdateProfile) {
      toast.success("Profile Updated successfully", { autoClose: 3000 });
      navigate("/users/my-profile");
    }
  });

  useEffect(() => {
    isErrorUpdateProfile &&
      (isFetchBaseQueryError(errorUpdateProfile)
        ? toast.error(getErrorMessage(errorUpdateProfile), { autoClose: 5000 })
        : isSerializedError(errorUpdateProfile)
        ? toast.error(errorUpdateProfile?.message)
        : "Unknown Error",
      { autoClose: 5000 });
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
