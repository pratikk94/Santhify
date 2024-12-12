import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("access_token"); // Use correct key where the token is stored

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    // Decode the token payload without using a library for testing
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode base64 payload
    const isExpired = payload.exp * 1000 < Date.now(); // Convert exp to milliseconds
    if (isExpired) {
      throw new Error("Token expired");
    }
  } catch (error) {
    console.error("Invalid or expired token:", error);
    localStorage.removeItem("access_token"); // Clear token if invalid
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
