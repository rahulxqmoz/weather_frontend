import React from 'react';

const RainChanceCard = ({ weatherData }) => {
  // Extract hourly data (time and chance_of_rain)
  const hourlyData = weatherData.forecast.forecastday[0].hour;

  // Map the data to display the time and chance of rain for the first 6 hours
  const rainData = hourlyData.slice(0, 6).map(hour => ({
    time: hour.time.split(' ')[1],  // Extract just the time (e.g., '00:00')
    chanceOfRain: hour.chance_of_rain,
  }));

  return (
    <div
      className="card mb-4 p-4"
      style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(50, 50, 255, 0.8), rgba(50, 205, 50, 0.8))',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        color: '#fff',
      }}
    >
      <h3 className="mb-4" style={{ textAlign: 'center' }}>
        Rain Forecast for Today
      </h3>
      <div>
        {rainData.map((data, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              <strong>{data.time}</strong>
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              <strong>Chance of Rain:</strong> {data.chanceOfRain}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RainChanceCard;
