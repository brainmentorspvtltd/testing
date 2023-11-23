import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tab,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import { Login } from "../components/Login";
import { Register } from "../components/Register";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
export const User = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label=""
              centered
              indicatorColor="secondary"
            >
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Login />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Register />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};
