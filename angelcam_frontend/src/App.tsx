// src/App.tsx
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router(null)} />
    </ThemeProvider>
  );
};

export default App;
