// src/routes/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import Landing from "./components/landing/Landing";
import MyCameras from "./components/cameras/MyCameras";
import CameraRecordings from "./components/cameras/CameraRecordings";
import RecordingDetails from "./components/recordings/RecordingDetails";

const router = (user: any | null) => {
  return createBrowserRouter([
    {
      path: "/",
      element: user ? <Landing /> : <LoginForm />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          index: true,
          element: user ? <MyCameras /> : <LoginForm />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/cameras",
          element: user ? <MyCameras /> : <LoginForm />,
        },
        {
          path: "/cameras/:cameraId",
          element: user ? <CameraRecordings /> : <LoginForm />,
        },
        {
          path: "/recordings/:recordingId",
          element: user ? <RecordingDetails /> : <LoginForm />,
        },
      ],
    },
  ]);
};

export default router;
