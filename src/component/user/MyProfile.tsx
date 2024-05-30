import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMyProfileQuery } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const MyProfile = () => {
  const {
    isError: isErrorMyProfile,
    data: dataMyProfile,
    error: errorMyProfile,
    // refetch,
  } = useMyProfileQuery({});

  const profileData = dataMyProfile?.result || {};
  // refetch();
  useEffect(() => {
    isErrorMyProfile &&
      (isFetchBaseQueryError(errorMyProfile)
        ? toast.error(getErrorMessage(errorMyProfile), { autoClose: 5000 })
        : isSerializedError(errorMyProfile)
        ? toast.error(errorMyProfile?.message, { autoClose: 5000 })
        : "Unknown Error");
  }, [isErrorMyProfile, errorMyProfile]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Role: </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{profileData.fullName}</TableCell>
              <TableCell>{profileData.email}</TableCell>
              <TableCell>{profileData.phoneNumber}</TableCell>
              <TableCell>{profileData.role} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button color="primary" variant="contained" href="/users/update-profile">
        Edit Profile
      </Button>
    </>
  );
};

export default MyProfile;
