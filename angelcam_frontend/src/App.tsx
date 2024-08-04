// src/App.tsx
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LoginForm from "./components/auth/LoginForm";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginForm />
    </ThemeProvider>
  );
};

export default App;
