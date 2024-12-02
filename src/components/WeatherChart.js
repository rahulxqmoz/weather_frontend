import React from 'react';
import { Line } from 'react-chartjs-2';


const WeatherChart = ({ weatherData }) => {
  // Safely access nested data
  
  const forecastDays = weatherData?.forecast?.forecastday;

  if (!forecastDays || forecastDays.length === 0) {
    return <div>No forecast data available for the chart.</div>;
  }

  // Map data only if `forecastDays` exists
  const labels = forecastDays.map((day) => day.date);
  const temperatureData = forecastDays.map((day) => day.day.avgtemp_c);
  const humidityData = forecastDays.map((day) => day.day.avghumidity);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: temperatureData,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Average Humidity (%)',
        data: humidityData,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default WeatherChart;
