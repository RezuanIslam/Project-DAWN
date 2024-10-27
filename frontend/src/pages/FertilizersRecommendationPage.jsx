import { useState } from "react";

const FertilizersRecommendationPage = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [soilType, setSoilType] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [nitrogen, setNitrogen] = useState(null);
  const [potassium, setPotassium] = useState(null);
  const [phosphorous, setPhosphorous] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("Temparature", temperature);
    formData.append("Humidity", humidity);
    formData.append("Moisture", moisture);
    formData.append("Nitrogen", nitrogen);
    formData.append("Potassium", potassium);
    formData.append("Phosphorous", phosphorous);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/fertilizerrecommendation",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setPrediction(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('closeup-shot-rice-plant-sunset-with-plantation-background.jpg')",
      }}
    >
      <div className="card bg-base-100 bg-opacity-75 shadow-xl m-5">
        <div className="card-body flex justify-center items-center space-y-6">
          <h2 className="card-title text-3xl">Fertilizer Recommendation</h2>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col space-y-6"
          >
            <label className="input input-bordered flex items-center gap-2 w-full">
              Temparature
              <input
                type="text"
                className="grow"
                placeholder="20.87974371"
                name="n"
                onChange={(event) => {
                  setTemperature(event.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Humidity
              <input
                type="text"
                className="grow"
                placeholder="82.00274423"
                name="p"
                onChange={(event) => {
                  setHumidity(event.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Moisture
              <input
                type="text"
                className="grow"
                placeholder="23.7"
                name="k"
                onChange={(event) => {
                  setMoisture(event.target.value);
                }}
              />
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Soil Type
              </option>
              <option>Black</option>
              <option>Clayey</option>
              <option>Loamy</option>
              <option>Red</option>
              <option>Sandy</option>
            </select>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Crop Type
              <input
                type="text"
                className="grow"
                placeholder="Cereal Crops"
                name="temperature"
                onChange={(event) => {
                  setCropType(event.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Nitrogen
              <input
                type="text"
                className="grow"
                placeholder="90"
                name="humidity"
                onChange={(event) => {
                  setNitrogen(event.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Potassium
              <input
                type="text"
                className="grow"
                placeholder="43"
                name="ph"
                onChange={(event) => {
                  setPotassium(event.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              Phosphorous
              <input
                type="text"
                className="grow"
                placeholder="42"
                name="rainfall"
                onChange={(event) => {
                  setPhosphorous(event.target.value);
                }}
              />
            </label>

            <button className="btn btn-primary w-full" type="submit">
              Predict
            </button>
            {prediction && (
              <>
                <h2 className="card-title btn btn-primary w-full">
                  {prediction.class}
                </h2>
              </>
            )}
          </form>

          {loading && (
            <span className="loading loading-spinner text-primary loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizersRecommendationPage;
