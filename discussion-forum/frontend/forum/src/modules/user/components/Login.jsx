import { TextField, Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { login, resetLoginStatus } from "../redux/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../shared/services/notify";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    if (state.loginStatus === "succeeded") {
      notify.success("Login successfully");
      dispatch(resetLoginStatus());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (state.loginStatus === "failed") {
      notify.error("Login failed");
      dispatch(resetLoginStatus());
    }
  }, [state.loginStatus, dispatch]);

  const doLogin = () => {
    dispatch(
      login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };
  return (
    <>
      <Box
        sx={{
          width: 300,
          maxWidth: "100%",
        }}
      >
        <TextField
          inputRef={emailRef}
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          inputRef={passwordRef}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <br />
        <br />
        <Button disabled={state.loading} onClick={doLogin} variant="contained">
          Login
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};
