import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const {
    location: { name, country },
    current: { temp_c, condition, humidity, wind_mph },
  } = weatherData;

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
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
        {/* Left Section */}
        <div className="text-center text-lg-start mb-3 mb-lg-0">
          <h3 className="mb-2" style={{ fontWeight: '600', fontSize: '1.5rem' }}>
            {name}, {country}
          </h3>
          <p className="mb-1" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {condition.text}
          </p>
          <p
            className="mb-1"
            style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Temperature: {temp_c}°C
          </p>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center">
          {/* Weather Icon */}
          <img
            src={`https:${condition.icon}`}
            alt={condition.text}
            className="me-3"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid #fff',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          />
          <div>
            <p
              className="mb-1"
              style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.8 }}
            >
              <strong>Humidity:</strong> {humidity}%
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.8 }}>
              <strong>Wind:</strong> {wind_mph} mph
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
