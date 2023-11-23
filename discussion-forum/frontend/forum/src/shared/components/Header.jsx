import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../modules/user/redux/user-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserById());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Container maxWidth="xl" sx={{ margin: "auto" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brain Mentors Forum App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              onClick={() => navigate("/create")}
              sx={{ color: "#fff", marginRight: "16px", cursor: "pointer" }}
              style={{ fontWeight: "bold" }}
            >
              Submit
            </Typography>
            <Box
              sx={{
                bgcolor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                fontSize: "1.2rem",
                p: 0.8,
              }}
              style={{ borderRadius: "5px" }}
            >
              {state.user && (
                <Typography variant="h6" sx={{ marginRight: "8px" }}>
                  {state.user.name} /
                </Typography>
              )}
              {state.user ? (
                <Link
                  href="/"
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <Link href="/join">Join</Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
