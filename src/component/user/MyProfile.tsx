import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMyProfileQuery } from "../../services/api/UserService";
import { RootState } from "../../store/store";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { LightTooltip } from "../theme/MuiSidebarTheme";

const MyProfile = () => {
  const token = useSelector((store: RootState) => store.user.token);

  const {
    isError: isErrorMyProfile,
    data: dataMyProfile,
    error: errorMyProfile,
    refetch,
  } = useMyProfileQuery(token);

  useEffect(() => {
    // Trigger refetch when groupId changes or on initial load
    refetch();
  }, [token, refetch]);

  const profileData = dataMyProfile?.result || {};
  const adminToken = useSelector((store: RootState) => store.user.adminToken);

  const href = adminToken
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
      <div>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          My Profile
        </Typography>
        <Box className="user-profile-container">
          <Box
            sx={{
              width: "50%",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/deerwalk.png"
                sx={{ marginBottom: "0.5rem", width: "20%", height: "20%" }}
              ></Avatar>
              <Box height={20} />
              <Typography variant="h5">
                {changeFirstName(profileData.fullName)}
              </Typography>
            </Box>
            <Box height={5} />
            <Box
              sx={{
                // width: "80%",
                height: "40vh",
                backgroundColor: "white",
                margin: "auto",
                borderRadius: "15px",
                padding: "2rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  marginLeft: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography>
                    <MailOutlineIcon />{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "30px" }}>
                    {profileData.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography>
                    <PhoneIcon />
                  </Typography>
                  <Typography sx={{ marginLeft: "30px" }}>
                    {profileData.phoneNumber}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography>
                    <AdminPanelSettingsIcon />
                  </Typography>
                  <Typography sx={{ marginLeft: "30px" }}>
                    {changeFirstName(profileData.role)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <LightTooltip title="Edit" placement="right">
                  <Button variant="text" href={href}>
                    <EditIcon sx={{ "&:hover": { color: "#1976D2" } }} />
                  </Button>
                </LightTooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default MyProfile;
