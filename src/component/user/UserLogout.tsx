import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../features/userSlice";
import UserLogin from "./UserLogin";

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(clearToken());
    navigate("/users/login");
  });
  return (
    <>
      <UserLogin />
    </>
  );
};

export default UserLogout;
