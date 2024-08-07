import React, { useEffect, useState } from "react";
import { Camera } from "../../types/cameraTypes";
import services from "../api/services";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CameraList: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await services.getSharedCameras();
        setCameras(response.results);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const handleCardClick = (cameraId: string) => {
    navigate(`/camera/${cameraId}`);
  };

  return (
    <Container sx={{ my: 1 }}>
      <Typography style={{ fontSize: "26px", fontWeight: 600 }} sx={{ my: 2 }}>
        Shared Cameras
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {cameras.map((camera, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleCardClick(camera.id.toString())}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  alt={`${camera.name} snapshot`}
                  height="350"
                  image={camera.snapshot.url}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {camera.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {camera.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owner: {camera.owner.first_name} {camera.owner.last_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {Array.from({ length: 4 - cameras.length }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={`empty-${index}`}>
              <Box
                sx={{
                  height: 350,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "grey.300",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Empty Slot
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CameraList;
