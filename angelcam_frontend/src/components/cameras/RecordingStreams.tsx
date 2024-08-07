import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import VideoPlayer from "../recordings/VideoPlayer";
import services from "../api/services";

const RecordingStreams = () => {
  const { cameraId } = useParams();
  const [loading, setLoading] = useState(true);
  const [recordingDetails, setRecordingDetails] = useState<any>(null);
  const [recordingStream, setRecordingStream] = useState<any>(null);

  useEffect(() => {
    const fetchRecordingDetails = async () => {
      try {
        const response = await services.getCameraRecordings(cameraId as string);
        setRecordingDetails(response);
        fetchRecordingStream(response.recording_start);
      } catch (error) {
        console.error("Error fetching recording details", error);
        setLoading(false);
      }
    };

    const fetchRecordingStream = async (start: string) => {
      try {
        const response = await services.getRecordingStream(
          cameraId as string,
          start
        );
        setRecordingStream(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recording stream", error);
        setLoading(false);
      }
    };

    fetchRecordingDetails();
  }, [cameraId]);

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, maxHeight: "90%", overflowY: "auto", marginTop: 1 }}
    >
      <Typography variant="h5" gutterBottom>
        Recorded Streams
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="55vh"
        >
          <CircularProgress />
        </Box>
      ) : recordingStream ? (
        <Box minHeight="55vh">
          <VideoPlayer
            url={recordingStream.url}
            format={recordingStream.format}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                (window.location.href = recordingStream.stream_controls.play)
              }
            >
              Play
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                (window.location.href = recordingStream.stream_controls.pause)
              }
              sx={{ marginLeft: 2 }}
            >
              Pause
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                (window.location.href = `${recordingStream.stream_controls.speed}?rate=2`)
              }
              sx={{ marginLeft: 2 }}
            >
              2x Speed
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" gutterBottom>
          No recorded streams found.
        </Typography>
      )}
    </Paper>
  );
};

export default RecordingStreams;
