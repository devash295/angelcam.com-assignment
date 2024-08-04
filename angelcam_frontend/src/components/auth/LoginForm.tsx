import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const TOKEN_REGEX = /^[a-zA-Z0-9]{40}$/;
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & { token: { value: string } };
    const token = form.token.value;

    if (!TOKEN_REGEX.test(token)) {
      alert("Invalid token format");
      return;
    }

    // Save the token in localStorage
    localStorage.setItem("personalAccessToken", token);

    // Navigate to the home page
    navigate("/");

    console.log(token);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Angelcam Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="token"
            label="Angelcam Personal Access Token"
            name="token"
            autoComplete="token"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
