import React from "react";
import SoilMonitoringChart from "./SoilMonitoringChart";
import AirTemperatureAndHumidityMonitoringChart from "./AirTemperatureAndHumidityMonitoringChart";

const AirTemperatureAndHumidityMonitoringPage = () => {
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
              <div className="stat-title text-3xl">Air Temperature</div>
              <div className="stat-value text-primary text-5xl">30.2</div>
              <div className="stat-desc text-xl">
                Air Temperature is adequate.
              </div>
              <div className="stat-title text-3xl">Humidity</div>
              <div className="stat-value text-primary text-5xl">75.4</div>
              <div className="stat-desc text-xl">Humidity is Good.</div>
            </div>
          </div>
          <div className="stats shadow-xl">
            <AirTemperatureAndHumidityMonitoringChart className="w-full text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirTemperatureAndHumidityMonitoringPage;
