import { useRef, useState } from "react";
import Navbar from "../components/Navbar";

const PlantGrowthStagePage = () => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("http://127.0.0.1:5000/plantgrowthstage", {
        method: "POST",
        body: formData,
      });
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
      <div className="hero-content text-neutral-content text-center">
        <div className="flex-1">
          <div className="card bg-base-100 shadow-xl bg-opacity-75 w-96">
            <div className="card-body flex justify-center items-center space-y-6">
              <h2 className="card-title text-3xl">Plant Growth Stage</h2>
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-col space-y-2"
              >
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={handleFileChange}
                />
                <figure>
                  {imageURL && <img src={imageURL} ref={imageRef} />}
                </figure>
                <button className="btn btn-primary w-full" type="submit">
                  Predict
                </button>
                {prediction && (
                  <>
                    <h2 className="btn btn-primary w-full">
                      {prediction.class}
                    </h2>
                    <p className="btn btn-primary w-full">
                      Confidence Score: {prediction.confidence}%
                    </p>
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

export default PlantGrowthStagePage;
