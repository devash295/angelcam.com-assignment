import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import Landing from "./components/landing/Landing";
import CameraRecordings from "./components/cameras/CameraRecordings";
import ProtectedRoute from "./components/ProtectedRoute";

const router = (user: any) =>
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Landing />} />,
    },
    {
      path: "/camera/:cameraId",
      element: <ProtectedRoute element={<CameraRecordings />} />,
    },
    {
      path: "*",
      element: <Navigate to={user ? "/home" : "/login"} replace />,
    },
  ]);

export default router;
