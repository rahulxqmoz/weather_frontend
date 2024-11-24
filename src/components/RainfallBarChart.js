import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const RainfallBarChart = ({ weatherData }) => {
  const forecastDays = weatherData?.forecast?.forecastday;

  if (!forecastDays || forecastDays.length === 0) {
    return <div>No forecast data available for the chart.</div>;
  }

  // Count rainy and non-rainy days
  const rainyDays = forecastDays.filter((day) => day.day.daily_will_it_rain === 1).length;
  const nonRainyDays = forecastDays.length - rainyDays;

  const data = {
    labels: ['Rainy Days', 'Non-Rainy Days'],
    datasets: [
      {
        label: 'Number of Days',
        data: [rainyDays, nonRainyDays],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 159, 64, 0.8)'],
        barThickness: 30,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        
        categoryPercentage: 0.5,  
        barPercentage: 0.10, 
      },
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options}/>;
};

export default RainfallBarChart;
