import * as React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import mpegts from "mpegts.js";

interface IVideoPlayerProps {
  url: string;
  format: string;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ url, format }) => {
  const videoNode = React.useRef<HTMLVideoElement | null>(null);
  const player = React.useRef<videojs.Player | null>(null);
  const mpegtsPlayer = React.useRef<any>(null);

  React.useEffect(() => {
    const setupPlayer = () => {
      if (videoNode.current) {
        if (player.current) {
          player.current.dispose();
        }

        if (format === "mjpeg") {
          const imgElement = document.createElement("img");
          imgElement.src = url;
          imgElement.alt = "MJPEG Stream";
          imgElement.style.width = "100%";
          imgElement.style.height = "100%";

          if (videoNode.current && videoNode.current.parentNode) {
            videoNode.current.parentNode.replaceChild(
              imgElement,
              videoNode.current
            );
          }
        } else {
          player.current = videojs(
            videoNode.current,
            initialOptions,
            function () {
              const videoJsPlayer = this;

              if (format === "hls") {
                videoJsPlayer.src({ src: url, type: "application/x-mpegURL" });
              } else if (format === "mpegts") {
                if (mpegts) {
                  mpegtsPlayer.current = mpegts.createPlayer({
                    type: "mpegts",
                    isLive: true,
                    url: url,
                  });
                  if (videoNode.current) {
                    mpegtsPlayer.current.attachMediaElement(videoNode.current);
                    mpegtsPlayer.current.load();
                    mpegtsPlayer.current.play();
                  }
                }
              } else {
                videoJsPlayer.src({ src: url, type: `video/${format}` });
              }
            }
          );
        }
      }
    };

    const timer = setTimeout(() => {
      setupPlayer();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (mpegtsPlayer.current) {
        mpegtsPlayer.current.destroy();
        mpegtsPlayer.current = null;
      }
      if (player.current) {
        player.current.dispose();
        player.current = null;
      }
    };
  }, [url, format]);

  return (
    <div data-vjs-player>
      <div
        ref={(videoNodeWrapper) => {
          if (videoNodeWrapper) {
            const videoElement = document.createElement("video");
            videoElement.className = "video-js";
            videoNodeWrapper.appendChild(videoElement);
            videoNode.current = videoElement;
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;
