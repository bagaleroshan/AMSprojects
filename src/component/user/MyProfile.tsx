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
  } = useMyProfileQuery({});

  const profileData = dataMyProfile?.result || {};

  const href =
    dataMyProfile?.result?.role === "admin"
      ? "/admin/update-profile"
      : "/teachers/update-profile";

  useEffect(() => {
    if (isErrorMyProfile) {
      if (isFetchBaseQueryError(errorMyProfile)) {
        toast.error(getErrorMessage(errorMyProfile), { autoClose: 5000 });
      } else if (isSerializedError(errorMyProfile)) {
        toast.error(errorMyProfile?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
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
      <Button color="primary" variant="contained" href={href}>
        Edit Profile
      </Button>
    </>
  );
};

export default MyProfile;
