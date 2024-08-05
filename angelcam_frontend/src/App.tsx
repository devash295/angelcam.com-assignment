import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import router from "./routes";

const theme = createTheme();

const App: React.FC = () => {
  // Check for the access token cookie
  const token = Cookies.get("personalAccessToken");
  const user = token ? true : null;

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router(user)} />
    </ThemeProvider>
  );
};

export default App;
