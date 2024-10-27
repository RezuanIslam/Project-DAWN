import React from "react";
import Navbar from "../components/Navbar";

const BudgetPage = () => {
  const [data, setData] = React.useState([]);
  const [pressed, setPressed] = React.useState(false);
  React.useEffect(() => {
    fetch("http://localhost:8080/api/arduino-data")
      .then((response) => response.json())
      .then((data) => setData(data.feeds));
  }, []);
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md space-y-5">
            <h1 className="mb-5 text-5xl font-bold"> Iot Expense Calculator</h1>
            <label className="input input-bordered flex items-center gap-2">
              Area
              <input type="text" className="grow" placeholder="2000 sq/ft" />
            </label>
            <div className="bg-primary-content">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Soil Moisture Monitoring </span>
                  <input type="radio" className="radio checked:bg-red-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Temperature & Humidity Monitoring
                  </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Smart Irrigation System </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Weather Monitoring Station</span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">pH Level Monitoring</span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Pest Detection </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Crop Health Monitoring </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Automated Fertilizer Application{" "}
                  </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Greenhouse Automation </span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Water Quality Monitoring</span>
                  <input type="radio" className="radio checked:bg-blue-500" />
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setPressed(true)}
            >
              Calculate
            </button>
            {pressed && (
              <div>
                <button className="btn btn-primary">
                  Total Cost: 40700 Taka
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetPage;
