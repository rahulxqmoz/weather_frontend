import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleLoginSuccess = async (credentialResponse) => {
    try {
        const token = credentialResponse.credential;
        if (!token) throw new Error("Google credential missing");
        console.log(credentialResponse.credential)
        const response = await axios.post(
            "https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com/api/auth/google/",
            { token: token }, 
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        console.log(response.data)
        const { access_token, user_id, username, email, role } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify({ id: user_id, username, email, role }));

        dispatch(login({ token: access_token, user: { id: user_id, username, email,role }, role }));

        navigate("/dashboard");
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
        setErrorMessage(errorMsg);
        console.error("Login failed:", error.response ? error.response.data : error);
    }
};

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body text-center">
          <h1 className="h4 text-primary mb-4">
            ☀️ <strong>WeatherSphere</strong> 🌧️
          </h1>
          <p className="text-secondary mb-4">
            Sign in with Google to explore the world of weather insights.
          </p>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.error("Google Login Failed")}
            />
          </div>
          <p className="text-muted small mt-3">
            Your personal gateway to real-time weather data and analytics.
          </p>
        </div>
      </div>
    </div>
    
    );
};

export default Login;
