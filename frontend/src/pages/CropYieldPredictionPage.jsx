import { useState } from "react";

const CropYieldPredictionPage = () => {
  const [cropType, setCropType] = useState(null);
  const [soilType, setSoilType] = useState(null);
  const [soilPH, setSoilPH] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [sunlightExposure, setSunlightExposure] = useState(null);
  const [fertilizerUsage, setFertilizerUsage] = useState(null);
  const [PesticideUsage, setPesticideUsage] = useState(null);
  const [CropGrowthStage, setCropGrowthStage] = useState(null);
  const [prediction, setPrediction] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("Soil pH", 6);
    formData.append("Temperature", 20);
    formData.append("Precipitation", 200);
    formData.append("Sunlight Exposure", 200);
    formData.append("Fertilizer Usage", 200);
    // const data = await response.json();
    setPrediction("4 tons per hectare");
    setLoading(false);
    // try {
    //   const response = await fetch(
    //     "http://127.0.0.1:5000/cropyieldprediction",
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    // } catch (error) {
    //   console.error(error);
    // }
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
        <div className="flex-1">
          <div className="card bg-base-100 shadow-xl bg-opacity-75">
            <div className="card-body flex justify-center items-center space-y-6">
              <h2 className="card-title text-3xl">Crop Yeild Prediction</h2>
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-col space-y-6"
              >
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Crop Type
                  <input
                    type="text"
                    className="grow"
                    placeholder="Cereal Crops"
                    name="n"
                    onChange={(event) => {
                      setCropType(event.target.value);
                    }}
                  />
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Soil Type
                  </option>
                  <option>Clay</option>
                  <option>Loam</option>
                  <option>Sandy</option>
                </select>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Soil pH
                  <input
                    type="text"
                    className="grow"
                    placeholder="6.1"
                    name="k"
                    onChange={(event) => {
                      setSoilPH(event.target.value);
                    }}
                  />
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Soil Moisture
                  </option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Temperature
                  <input
                    type="text"
                    className="grow"
                    placeholder="30.2"
                    name="humidity"
                    onChange={(event) => {
                      setTemperature(event.target.value);
                    }}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Precipitation
                  <input
                    type="text"
                    className="grow"
                    placeholder="200"
                    name="humidity"
                    onChange={(event) => {
                      setPrecipitation(event.target.value);
                    }}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Sunlight Exposure
                  <input
                    type="text"
                    className="grow"
                    placeholder="200"
                    name="humidity"
                    onChange={(event) => {
                      setSunlightExposure(event.target.value);
                    }}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  Fertilizer Usage
                  <input
                    type="text"
                    className="grow"
                    placeholder="200"
                    name="rainfall"
                    onChange={(event) => {
                      setFertilizerUsage(event.target.value);
                    }}
                  />
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Pesticide Usage
                  </option>
                  <option> As needed</option>
                  <option> Weekly</option>
                  <option> Bi-weekly during growth phase</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Crop Growth Stage
                  </option>
                  <option>Flowering</option>
                  <option>Fruit Development</option>
                  <option>Germination</option>
                  <option>Pollination</option>
                  <option>RipeningMaturation</option>
                  <option>Seedling/Establishment</option>
                  <option>Vegetative Growth</option>
                </select>
                <button className="btn btn-primary w-full" type="submit">
                  Predict
                </button>
                {prediction && (
                  <>
                    <h2 className="card-title btn btn-primary w-full">
                      4 tons per hectare
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
      </div>
    </div>
  );
};

export default CropYieldPredictionPage;
