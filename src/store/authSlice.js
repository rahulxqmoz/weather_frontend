import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("access_token"),
  user: null,
  token: localStorage.getItem("access_token") || null, // Retrieve the token from localStorage
  role: JSON.parse(localStorage.getItem("user"))?.role || null,
};


if (initialState.token) {
  const user = JSON.parse(localStorage.getItem("user"));
  initialState.user = user;
  initialState.role = user?.role;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("access_token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
