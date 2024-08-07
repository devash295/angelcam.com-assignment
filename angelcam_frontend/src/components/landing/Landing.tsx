import React from "react";
import { Container, Box } from "@mui/material";
import CameraList from "./CameraList";

const Landing: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <CameraList />
      </Box>
    </Container>
  );
};

export default Landing;
