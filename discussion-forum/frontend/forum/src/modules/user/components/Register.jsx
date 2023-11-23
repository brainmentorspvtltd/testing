import { TextField, Box, Button } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetRegisterStatus } from "../redux/user-slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../shared/services/notify";
import { useEffect } from "react";

export const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  useEffect(() => {
    if (state.registerStatus === "succeeded") {
      notify.success("Register successfully");
      dispatch(resetRegisterStatus());
    }
    if (state.registerStatus === "failed") {
      notify.error("Register failed");
      dispatch(resetRegisterStatus());
    }
  }, [state.registerStatus, dispatch]);

  const doRegister = () => {
    dispatch(
      register({
        email: email.current.value,
        password: password.current.value,
        name: name.current.value,
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
          inputRef={email}
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          inputRef={password}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          inputRef={name}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <br />
        <br />
        <Button
          disabled={state.loading}
          onClick={doRegister}
          variant="contained"
        >
          Register
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};
