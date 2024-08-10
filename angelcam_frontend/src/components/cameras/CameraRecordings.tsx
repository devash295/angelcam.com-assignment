import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../../api/services";
import {
  CircularProgress,
  Box,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoPlayer from "../recordings/VideoPlayer";
import RecordingStreams from "./RecordingStreams";

const CameraRecordings = () => {
  const { cameraId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cameraInfo, setCameraInfo] = useState<any>(null);
  const [selectedStream, setSelectedStream] = useState<any>(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCameraDetails = async () => {
      try {
        const streamsResponse = await services.getCameraStreams(
          cameraId as string
        );
        setCameraInfo(streamsResponse);
        const prioritizedStream = prioritizeStreams(streamsResponse.streams);
        setSelectedStream(prioritizedStream);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching camera details", error);
        setLoading(false);
      }
    };

    fetchCameraDetails();
  }, [cameraId]);

  const prioritizeStreams = (streams: any) => {
    const formats = ["mp4", "hls", "mpegts", "mjpeg"];
    for (const format of formats) {
      const stream = streams.find((stream: any) => stream.format === format);
      if (stream) {
        return stream;
      }
    }
    return streams[0]; // Default to the first stream if no preferred format is found
  };

  const memoizedVideoPlayer = React.useMemo(
    () => (
      <VideoPlayer
        key={selectedStream?.url} // Add a unique key to ensure re-rendering
        url={selectedStream?.url}
        format={selectedStream?.format}
      />
    ),
    [selectedStream]
  );

  return (
    <Container
      sx={{ height: "85vh", display: "flex", flexDirection: "column" }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          flexGrow={1}
          marginTop={2}
        >
          <Box flex={2} overflow="auto">
            <Box display="flex" alignItems="center" marginBottom={1}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography fontWeight="bold" ml={1} fontSize={30}>
                Live Stream
              </Typography>
            </Box>
            {selectedStream && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>{memoizedVideoPlayer}</Box>
                </Grid>
              </Grid>
            )}
            <Paper
              elevation={3}
              sx={{ padding: 2, mt: 2, textAlign: "center" }}
            >
              <Typography variant="h6" color="textSecondary">
                Camera Name:{" "}
                <Typography component="span" variant="h6" fontWeight="bold">
                  {cameraInfo?.name}
                </Typography>
              </Typography>
              <Typography variant="h6" color="textSecondary" mt={1}>
                Owner Name:{" "}
                <Typography component="span" variant="h6" fontWeight="bold">
                  {cameraInfo?.owner?.first_name} {cameraInfo?.owner?.last_name}
                </Typography>
              </Typography>
            </Paper>
          </Box>
          <Box
            flex={1}
            ml={isMobile ? 0 : 4}
            mt={isMobile ? 2 : 0}
            sx={{
              borderLeft: isMobile ? "none" : "1px solid #ccc",
              paddingLeft: isMobile ? 0 : 2,
              overflow: "auto",
            }}
          >
            <RecordingStreams />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CameraRecordings;
