import React from "react";
import SoilMonitoringChart from "./SoilMonitoringChart";
import AirTemperatureAndHumidityMonitoringChart from "./AirTemperatureAndHumidityMonitoringChart";
import SoilPHAndWaterPHMonitoringChart from "./SoilPHAndWaterPHMonitoringChart";

const SoilPHAndWaterPHMonitoringPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('closeup-shot-rice-plant-sunset-with-plantation-background.jpg')",
      }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="flex w-full justify-center items-center gap-5">
          <div className="stats shadow w-96">
            <div className="stat space-y-5">
              <div className="stat-title text-3xl">Soil pH</div>
              <div className="stat-value text-primary text-5xl">13.75</div>
              <div className="stat-desc text-xl">Soil pH is adequate.</div>
              <div className="stat-title text-3xl">Water pH</div>
              <div className="stat-value text-primary text-5xl">11.22</div>
              <div className="stat-desc text-xl">Water pH is Good.</div>
            </div>
          </div>
          <div className="stats shadow-xl">
            <SoilPHAndWaterPHMonitoringChart className="w-full text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilPHAndWaterPHMonitoringPage;
