import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlantDiseaseDetectionPage = () => {
  const navigate = useNavigate();
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
      const response = await fetch(
        "http://127.0.0.1:5000/plant-disease-detection",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
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
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="flex justify-center">
            <div className="card bg-base-100 shadow-xl bg-opacity-75">
              <div className="card-body flex justify-center items-center space-y-6">
                <h2 className="card-title text-3xl font-normal">
                  Plant Disease Detection
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex justify-center items-center flex-col space-y-3"
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
                </form>
                {loading && (
                  <span className="loading loading-spinner text-primary loading-lg"></span>
                )}
                {prediction && (
                  <div className="text-xl space-y-3">
                    <h1>Disease Name: </h1>
                    <h1>{prediction.class}</h1>
                    <h1>Confidence Score: {prediction.confidence}%</h1>
                  </div>
                )}
                {prediction && (
                  <button
                    className="btn btn-primary w-full"
                    onClick={() =>
                      window.open(
                        "https://www.udel.edu/academics/colleges/canr/cooperative-extension/fact-sheets/northern-corn-leaf-blight/#:~:text=Northern%20corn%20leaf%20blight%20(NCLB,established%20before%20tassel%20%5B1%5D."
                      )
                    }
                  >
                    Learn More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDiseaseDetectionPage;
