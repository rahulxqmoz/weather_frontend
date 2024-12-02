import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ city, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://weather-appxqmoz-b8bc0ab20be7.herokuapp.com/api/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch weather data.");
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

export default weatherSlice.reducer;
