import { LoginFailure, LoginStart, LoginSuccess } from "./context/AuthActions";
import axios from "axios";

export const loginCall = async (userCredentials, dispatch, navigate) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      userCredentials
    );
    dispatch(LoginSuccess(res.data));
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
  } catch (error) {
    dispatch(LoginFailure(error));
  }
};
