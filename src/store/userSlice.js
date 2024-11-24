import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user list
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch users.");
    }
  }
);

// Block user
export const blockUser = createAsyncThunk(
    "users/blockUser",
    async ({ userId, token, action }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com/api/users/block_unblock/${userId}/`,
          { action }, // Pass 'block' or 'unblock'
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return { userId, action }; // Include the action in the response
      } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to update user status.");
      }
    }
  );
  

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const { userId, action: userAction } = action.payload;
        const user = state.users.find((user) => user.id === userId);
        if (user) {
          user.is_active = userAction === "unblock"; // Update based on action
        }
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.error = action.payload || "An error occurred while blocking user.";
      });
  },
});

export default userSlice.reducer;
