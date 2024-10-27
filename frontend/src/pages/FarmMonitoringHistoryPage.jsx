import React from "react";

const FarmMonitoringHistoryPage = () => {
  const readings = [
    {
      timestamp: "2024-09-24T12:30:00+0600",
      soil_moisture: 23.7,
      air_temperature: 30.2,
      humidity: 75.4,
      soil_temperature: 27.1,
      soil_ph: 6.1,
      water_ph: 7.3,
    },
    {
      timestamp: "2024-09-25T08:15:00+0600",
      soil_moisture: 25.2,
      air_temperature: 28.9,
      humidity: 78.3,
      soil_temperature: 26.5,
      soil_ph: 6.2,
      water_ph: 7.2,
    },
    {
      timestamp: "2024-09-26T16:45:00+0600",
      soil_moisture: 22.9,
      air_temperature: 31.1,
      humidity: 72.7,
      soil_temperature: 28.3,
      soil_ph: 6.0,
      water_ph: 7.4,
    },
    {
      timestamp: "2024-09-27T14:20:00+0600",
      soil_moisture: 24.1,
      air_temperature: 29.5,
      humidity: 74.8,
      soil_temperature: 27.0,
      soil_ph: 6.1,
      water_ph: 7.3,
    },
    {
      timestamp: "2024-09-28T09:50:00+0600",
      soil_moisture: 23.5,
      air_temperature: 30.0,
      humidity: 76.0,
      soil_temperature: 27.5,
      soil_ph: 6.2,
      water_ph: 7.2,
    },
    {
      timestamp: "2024-09-29T17:10:00+0600",
      soil_moisture: 24.8,
      air_temperature: 28.8,
      humidity: 75.2,
      soil_temperature: 26.8,
      soil_ph: 6.3,
      water_ph: 7.1,
    },
    {
      timestamp: "2024-09-30T11:45:00+0600",
      soil_moisture: 25.0,
      air_temperature: 29.2,
      humidity: 74.5,
      soil_temperature: 27.2,
      soil_ph: 6.1,
      water_ph: 7.3,
    },
    {
      timestamp: "2024-10-01T13:30:00+0600",
      soil_moisture: 24.3,
      air_temperature: 30.1,
      humidity: 73.8,
      soil_temperature: 27.4,
      soil_ph: 6.0,
      water_ph: 7.4,
    },
    {
      timestamp: "2024-10-02T18:00:00+0600",
      soil_moisture: 24.5,
      air_temperature: 29.7,
      humidity: 76.2,
      soil_temperature: 27.8,
      soil_ph: 6.3,
      water_ph: 7.1,
    },
    {
      timestamp: "2024-10-03T10:09:24+0600",
      soil_moisture: 25.3,
      air_temperature: 28.7,
      humidity: 72.0,
      soil_temperature: 25.5,
      soil_ph: 6.2,
      water_ph: 7.1,
    },
  ];
  return (
    <div className="overflow-x-auto bg-primary-content bg-opacity-75">
      <table className="table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Soil Moisture (%)</th>
            <th>Air Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Soil Temperature (°C)</th>
            <th>Soil pH</th>
            <th>Water pH</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading, index) => (
            <tr key={index}>
              <td>{reading.timestamp}</td>
              <td>{reading.soil_moisture}</td>
              <td>{reading.air_temperature}</td>
              <td>{reading.humidity}</td>
              <td>{reading.soil_temperature}</td>
              <td>{reading.soil_ph}</td>
              <td>{reading.water_ph}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmMonitoringHistoryPage;
