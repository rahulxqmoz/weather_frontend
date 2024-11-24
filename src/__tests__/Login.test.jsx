import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mocking dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@react-oauth/google", () => ({
  GoogleLogin: jest.fn(() => <button data-testid="google-login">Google Login</button>),
}));

jest.mock("axios");

describe("Login Component", () => {
  let mockDispatch, mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with all elements", () => {
    render(<Login />);

    expect(screen.getByText(/WeatherSphere/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
    expect(screen.getByTestId("google-login")).toBeInTheDocument();
  });

  it("displays error message when login fails", async () => {
    render(<Login />);

    // Mock Google login failure
    GoogleLogin.mock.calls[0][0].onError();
    expect(console.error).toHaveBeenCalledWith("Google Login Failed");
  });

  it("handles successful login", async () => {
    const token = "mock-google-token";
    const responseData = {
      access_token: "mock-access-token",
      user_id: 1,
      username: "testuser",
      email: "test@example.com",
      role: "user",
    };

    // Mock axios response
    axios.post.mockResolvedValueOnce({ data: responseData });

    render(<Login />);

    // Simulate Google login success
    await act(async () => {
      GoogleLogin.mock.calls[0][0].onSuccess({ credential: token });
    });

    // Verify axios API call
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/auth/google/",
      { token },
      { headers: { "Content-Type": "application/json" } }
    );

    // Verify localStorage updates
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "access_token",
      responseData.access_token
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        id: responseData.user_id,
        username: responseData.username,
        email: responseData.email,
        role: responseData.role,
      })
    );

    // Verify dispatch is called
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "auth/login",
      payload: {
        token: responseData.access_token,
        user: {
          id: responseData.user_id,
          username: responseData.username,
          email: responseData.email,
          role: responseData.role,
        },
        role: responseData.role,
      },
    });

    // Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("handles login failure gracefully", async () => {
    const token = "mock-google-token";

    // Mock axios failure
    axios.post.mockRejectedValueOnce({
      response: { data: { error: "Invalid token" } },
    });

    render(<Login />);

    // Simulate Google login success with invalid token
    await act(async () => {
      GoogleLogin.mock.calls[0][0].onSuccess({ credential: token });
    });

    // Verify error message is displayed
    await waitFor(() =>
      expect(screen.getByText("Invalid token")).toBeInTheDocument()
    );

    // Ensure navigation and dispatch are not called
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
