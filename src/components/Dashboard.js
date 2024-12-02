import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import UserManagement from './UserManagement';
import { useNavigate } from 'react-router-dom';
import RainfallBarChart from './RainfallBarChart';
import { logout } from '../store/authSlice';
import { fetchWeatherData } from '../store/weatherSlice';
import RainChanceCard from './RainChanceCard';

const Dashboard = () => {
    const { role, token,user } = useSelector((state) => state.auth);
    const { weatherData, loading } = useSelector((state) => state.weather);
    const [city, setCity] = useState("Palakkad"); // Default city 
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const debounceTimer = useRef(null); 
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
      } else {
        console.log('hi')
        dispatch(fetchWeatherData({ city, token }));
      }
    }, [token, city]);
 

    const handleLogout = () => {
        dispatch(logout());
        navigate("/"); 
    };

     const handleCityChange = (e) => {
        const newCity = e.target.value;
        setCity(newCity);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current); 
        }

        debounceTimer.current = setTimeout(() => {
            dispatch(fetchWeatherData({ city: newCity, token }));
        }, 500); 
    };
  
  
    return (
      <div className="container-fluid">
        <div className="row">
        {/* Header Section */}
        <div className="col-12 text-center my-4 d-flex justify-content-between align-items-center">
          <h2 className="mb-3">Weather Station</h2>

          {/* Search, User Info, and Logout Buttons Section */}
          <div className="d-flex align-items-center">
            {/* User Icon and Username */}
            <div className="d-flex align-items-center me-3  mb-3">
              <i className="bi bi-person-circle" style={{ fontSize: "1.5rem", marginRight: "8px" }}></i> {/* Bootstrap icon */}
              <span>{user.username}</span>
            </div>
            
            {/* City Search Input */}
            <div className="input-group mb-3 me-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter city name"
                value={city}
                onChange={handleCityChange}
              />
              <button className="btn btn-primary" onClick={fetchWeatherData} disabled={loading}>
                {loading ? "Loading..." : "Search"}
              </button>
            </div>

            {/* Logout Button */}
            <button className="btn btn-danger ms-2 mb-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
  
        <div className="row">
          {/* WeatherCard Section */}
          <div className="col-12 text-center mb-4">
            {loading ? (
              <div>Loading weather data...</div>
            ) : weatherData ? (
              <WeatherCard weatherData={weatherData} />
              
            ) : (
              <div>No data available. Please try searching for another city.</div>
            )}
          </div>

          <div className="col-12 text-center mb-4">
            {loading ? (
              <div>Loading weather data...</div>
            ) : weatherData ? (
              <RainChanceCard weatherData={weatherData} />
              
            ) : (
              <div>No data available. Please try searching for another city.</div>
            )}
          </div>

          
  
          {/* Charts Section */}
          <div className="col-lg-6 col-md-12">
            {weatherData && <WeatherChart type="bar" weatherData={weatherData} />}
          </div>
          <div className="col-lg-6 col-md-12">
            {weatherData && <RainfallBarChart type="line" weatherData={weatherData} />}
          </div>
         
        </div>
  
        {/* Admin Section */}
        {role === "admin" && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="text-center">Admin User Management</h3>
              <UserManagement />
            </div>
          </div>
        )}
        
    
      </div>
    );
  };
  

export default Dashboard;
