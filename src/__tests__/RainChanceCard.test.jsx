import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RainChanceCard from "./RainChanceCard";

const mockWeatherData = {
  location: {
    name: "London",
    country: "United Kingdom",
  },
  current: {
    temp_c: 10.3,
    condition: {
      text: "Moderate rain at times",
    },
  },
  forecast: {
    forecastday: [
      {
        day: {
          daily_chance_of_rain: 96,
        },
      },
    ],
  },
};

describe("RainChanceCard Component", () => {
  test("renders loading state when no data is passed", () => {
    render(<RainChanceCard />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders the location name and country", () => {
    render(<RainChanceCard weatherData={mockWeatherData} />);
    expect(screen.getByText("London, United Kingdom")).toBeInTheDocument();
  });

  test("renders the correct weather condition", () => {
    render(<RainChanceCard weatherData={mockWeatherData} />);
    expect(screen.getByText("Condition: Moderate rain at times")).toBeInTheDocument();
  });

  test("displays the temperature in Celsius", () => {
    render(<RainChanceCard weatherData={mockWeatherData} />);
    expect(screen.getByText("Temperature: 10.3°C")).toBeInTheDocument();
  });

  test("shows the correct chance of rain", () => {
    render(<RainChanceCard weatherData={mockWeatherData} />);
    expect(screen.getByText("Rain Chance: 96%")).toBeInTheDocument();
  });

  test("handles missing forecast data gracefully", () => {
    const incompleteData = { ...mockWeatherData, forecast: null };
    render(<RainChanceCard weatherData={incompleteData} />);
    expect(screen.getByText("Rain Chance: 0%")).toBeInTheDocument();
  });
});
