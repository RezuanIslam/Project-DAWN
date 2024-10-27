import React, { useRef, useState } from "react";

const EXG = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const imageRef = useRef();

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
    setFile(selectedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true); // Show loading spinner while processing the image
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/exg", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreview(imageUrl); // Show the image in the frontend
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
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
              <h2 className="card-title text-3xl">Excess Green Index (ExG)</h2>
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

                {preview && (
                  <div>
                    <h2>Processed Image</h2>
                    <img src={preview} alt="Processed NDVI" />
                  </div>
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

export default EXG;
