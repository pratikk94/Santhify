// Import required libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://testapi.studentpro.vils.ai/santhify/api/v1/account/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.status === "SUCCESS") {
        const { access_token, refresh_token } = response.data.data;
        localStorage.setItem("access_token", access_token.token);
        localStorage.setItem("refresh_token", refresh_token.token);
        setMessage("Login successful!");
        console.log("Navigating to /client");
        navigate("/client");
      } else {
        setMessage(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response || error.message);
      }
      setMessage("An error occurred during login. Please try again.");
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://example.com/api/refresh",
        {},
        { withCredentials: true }
      );

      if (response.data.status === "SUCCESS") {
        setMessage("Token refreshed successfully!");
      } else {
        setMessage("Failed to refresh token. Please login again.");
      }
    } catch (error) {
      setMessage("Error during token refresh.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="login-links">
        <a href="/forgot-password">Forgot Password?</a>
        <br />
        <a href="/signup">Create an Account</a>
      </div>
      <h2>Secure Actions</h2>
      <button onClick={refreshAccessToken}>Refresh Token</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
