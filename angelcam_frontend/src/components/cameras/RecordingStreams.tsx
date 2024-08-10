import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import VideoPlayer from "../recordings/VideoPlayer";
import services from "../api/services";

const RecordingStreams = () => {
  const { cameraId } = useParams();
  const [loading, setLoading] = useState(true);
  const [recordingStream, setRecordingStream] = useState<any>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const fetchRecordingDetails = async () => {
      try {
        const response = await services.getCameraRecordings(cameraId as string);
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

  const handleSpeedChange = async (event: any) => {
    const selectedSpeed = event.target.value;
    setSpeed(selectedSpeed);
    console.log("Speed changed to", selectedSpeed);
    // try {
    //   await services.speedRecordedStream(
    //     recordingStream.stream_controls.speed,
    //     selectedSpeed
    //   );
    // } catch (error) {
    //   console.error("Error changing stream speed", error);
    // }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        maxHeight: "90%",
        overflowY: "auto",
        marginTop: 1,
        boxShadow: `
      -3px 3px 3px -2px rgba(0, 0, 0, 0.2), 
      3px 3px 3px -2px rgba(0, 0, 0, 0.2), 
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 
      0px 1px 8px 0px rgba(0, 0, 0, 0.12)
    `,
      }}
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
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl
              sx={{
                minWidth: 120,
                marginRight: 2,
                height: "40px", // Set the height to match the button height
                ".MuiInputBase-root": {
                  height: "40px", // Adjust the height of the Select input
                  ".MuiSelect-select": {
                    paddingTop: "8px", // Adjust padding to vertically center the text
                    paddingBottom: "8px",
                  },
                },
              }}
            >
              <Select value={speed} onChange={handleSpeedChange}>
                <MenuItem value={1}>1x</MenuItem>
                <MenuItem value={2}>2x</MenuItem>
                <MenuItem value={4}>4x</MenuItem>
                <MenuItem value={8}>8x</MenuItem>
                <MenuItem value={16}>16x</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("play clicked");
                // services.playRecordedStream(
                //   recordingStream.stream_controls.play
                // )
              }}
              sx={{ marginRight: 2 }}
            >
              Play
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={
                () => {
                  console.log("pause clicked");
                }
                // services.pauseRecordedStream(
                //   recordingStream.stream_controls.pause
                // )}
              }
            >
              Pause
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
