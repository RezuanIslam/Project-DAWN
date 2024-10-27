import React from "react";
import SoilMonitoringChart from "./SoilMonitoringChart";

const SoilMoistureMonitoringPage = () => {
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
              <div className="stat-title text-3xl">Soil Moisture</div>
              <div className="stat-value text-primary text-5xl">523</div>
              <div className="stat-desc text-xl">
                Soil Moisture level is adequate.
              </div>
            </div>
          </div>
          <div className="stats shadow-xl">
            <SoilMonitoringChart className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureMonitoringPage;
