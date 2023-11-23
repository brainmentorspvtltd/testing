import React from "react";
import Header from "./Header";
import theme from "./Theme";
import { Box, Container, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box height={20} />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
