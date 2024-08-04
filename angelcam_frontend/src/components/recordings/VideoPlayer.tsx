// src/components/VideoPlayer.tsx
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import { Box, Button } from "@mui/material";
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, options);

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [options]);

  const playStream = async () => {
    await fetch(
      "https://rec-streamer-eu-central-1.angelcam.com/recording/streams/df0600b7487a44d480217db7713720d3/play/"
    );
    playerRef.current?.play();
  };

  const pauseStream = async () => {
    await fetch(
      "https://rec-streamer-eu-central-1.angelcam.com/recording/streams/df0600b7487a44d480217db7713720d3/pause/"
    );
    playerRef.current?.pause();
  };

  const setPlaybackSpeed = async (speed: number) => {
    await fetch(
      `https://rec-streamer-eu-central-1.angelcam.com/recording/streams/df0600b7487a44d480217db7713720d3/speed/?rate=${speed}`
    );
    playerRef.current?.playbackRate(speed);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Box sx={{ mb: 2 }} data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={playStream}
        sx={{ mx: 1 }}
      >
        Play
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={pauseStream}
        sx={{ mx: 1 }}
      >
        Pause
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setPlaybackSpeed(1.5)}
        sx={{ mx: 1 }}
      >
        1.5x Speed
      </Button>
    </Box>
  );
};

export default VideoPlayer;
