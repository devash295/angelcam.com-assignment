// src/components/CameraList.tsx
import React, { useEffect, useState } from "react";
import { Camera } from "../../types/cameraTypes";

const CameraList: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      const token = localStorage.getItem("personalAccessToken");
      if (!token) {
        setError("No access token found. Please log in.");
        return;
      }

      try {
        const response = await fetch(
          "https://api.angelcam.com/v1/shared-cameras/",
          {
            headers: {
              Authorization: `PersonalAccessToken ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cameras");
        }

        const data = await response.json();
        setCameras(data.results);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCameras();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Shared Cameras</h1>
      {cameras.length === 0 ? (
        <p>No cameras available.</p>
      ) : (
        <ul>
          {cameras.map((camera) => (
            <li key={camera.id}>
              <h2>{camera.name}</h2>
              <img src={camera.snapshot.url} alt={`${camera.name} snapshot`} />
              <p>Status: {camera.status}</p>
              <p>
                Owner: {camera.owner.first_name} {camera.owner.last_name}
              </p>
              <p>Type: {camera.type}</p>
              <div>
                <h3>Streams</h3>
                <ul>
                  {camera.streams.map((stream, index) => (
                    <li key={index}>
                      <a
                        href={stream.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {stream.format.toUpperCase()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CameraList;
