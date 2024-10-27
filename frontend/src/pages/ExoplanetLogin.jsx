import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoLocation from "./GeoLocation";

const ExoplanetLogin = () => {
  const navigate = useNavigate();
  const navigateToFarmingCalendar = () => {
    navigate("/exoplanet-exploration");
  };
  const [selectedValue, setSelectedValue] = useState(null);
  const onchange = (args) => {
    /*Displays selected date in the label*/
    setSelectedValue(args.value.toLocaleDateString());
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('closeup-shot-rice-plant-sunset-with-plantation-background.jpg')",
      }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="card shadow-xl bg-base-100 bg-opacity-75">
          <div className="card-body flex justify-center items-center space-y-3">
            <h2 className="card-title text-3xl">Exoplanet Exploration</h2>
            <form
              onSubmit={navigateToFarmingCalendar}
              className="flex justify-center items-center flex-col space-y-6"
            >
              <label className="input input-bordered flex items-center gap-2 w-full">
                Room ID
                <input
                  type="text"
                  className="grow"
                  name="n"
                  onChange={(event) => {
                    setN(event.target.value);
                  }}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                Room Password
                <input
                  type="text"
                  className="grow"
                  name="n"
                  onChange={(event) => {
                    setN(event.target.value);
                  }}
                />
              </label>

              <button className="btn btn-primary w-full" type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetLogin;
