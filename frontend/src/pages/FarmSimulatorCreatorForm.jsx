import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoLocation from "./GeoLocation";

const FarmSimulatorCreatorForm = () => {
  const navigate = useNavigate();
  const navigateToFarmingCalendar = () => {
    navigate("/farming-simulator");
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
            <h2 className="card-title text-3xl">Farming Simulator Creation</h2>
            <GeoLocation />
            <form
              onSubmit={navigateToFarmingCalendar}
              className="flex justify-center items-center flex-col space-y-6"
            >
              <label className="input input-bordered flex items-center gap-2 w-full">
                Crop Name
                <input
                  type="text"
                  className="grow"
                  placeholder="Wheat"
                  name="n"
                  onChange={(event) => {
                    setN(event.target.value);
                  }}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                Field Size
                <input
                  type="text"
                  className="grow"
                  placeholder="Width x Height"
                  name="n"
                  onChange={(event) => {
                    setN(event.target.value);
                  }}
                />
              </label>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Field Shape
                </option>
                <option>Square</option>
                <option>Rectangular</option>
                <option>Irregular</option>
              </select>
              <label className="input input-bordered flex items-center gap-2 w-full">
                Budget
                <input
                  type="text"
                  className="grow"
                  placeholder="2,000,000 Taka"
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

export default FarmSimulatorCreatorForm;
