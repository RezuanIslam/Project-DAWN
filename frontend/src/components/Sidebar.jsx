import React from "react";

const Sidebar = () => {
  return (
    <ul className="menu bg-base-100 rounded-box w-96 min-h-screen">
      <li>
        <a href="dashboard">Dashboard</a>
      </li>
      <li>
        <a href="/farm-monitoring-history">Farm Monitoring History</a>
      </li>
      <li>
        <a href="/yo">Anomaly Detection</a>
      </li>
      <li>
        <details open>
          <summary>Farming Analysis from satellite imaging</summary>
          <ul>
            <li>
              <a href="why">NDVI image generation</a>
            </li>
            <li>
              <a href="soil-map">Soil Moisture Mapping</a>
            </li>
            <li>
              <a href="evi">Enhanced Vegetation Index (EVI)</a>
            </li>
            <li>
              <a href="gli">Green Leaf Index (GLI)</a>
            </li>
            <li>
              <a href="VARI">Visible Atmospherically Resistant Index (VARI)</a>
            </li>
            <li>
              <a href="exg">Excess Green Index (ExG)</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Carbon Farming</summary>
          <ul>
            <li>
              <a href="companion-cropping">Companion Cropping</a>
            </li>
            <li>
              <a href="agro">Agroforestry</a>
            </li>
            <li>
              <a href="cover">Cover Cropping</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Farming Monitoring</summary>
          <ul>
            <li>
              <a href="soil-moisture-monitoring">Soil Moisture Monitoring</a>
            </li>
            <li>
              <a href="air-temperature-and-humidity-monitoring">
                Air Temperature and Humidity Monitoring
              </a>
            </li>
            <li>
              <a href="soil-temperature-monitoring">
                Soil Temperature Monitoring
              </a>
            </li>
            <li>
              <a href="soil-ph-and-water-ph-monitoring">
                Soil pH and Water pH Monitoring
              </a>
            </li>
            <li>
              <a href="budget">Iot Expense Calculator</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Farming Assistant</summary>
          <ul>
            <li>
              <a href="crop-recommendation">Crop Recommendation</a>
            </li>
            <li>
              <a href="fertilizers-recommendation">Fertilizer Recommendation</a>
            </li>
            <li>
              <a href="plant-growth-stage">Plant Growth Stage</a>
            </li>
            <li>
              <a href="crop-yield-prediction">Crop Yeild Prediction</a>
            </li>
            <li>
              <a href="plant-disease-detection">Plant Disease Detection</a>
            </li>
            <li>
              <a href="pest-detection">Pest Detection</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="/farming-scheduler-creation-form">Farming Calendar</a>
      </li>
      <li>
        <a href="/farming-simulator-creation-form">Farming Simulator</a>
      </li>
      <li>
        <a href="/login">Exoplanet Exploration</a>
      </li>
    </ul>
  );
};

export default Sidebar;
