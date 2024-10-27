import { useNavigate } from "react-router-dom";
import video from "../assets/4800099-hd_1920_1080_30fps.mp4";
import Footer from "../components/Footer";
import NavbarForHomePage from "../components/NavbarForHomePage";

const HomePage = () => {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("login");
  };
  return (
    <>
      <NavbarForHomePage />
      <div className="hero min-h-screen">
        <video className="videoTag" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero-content text-primary-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">DAWN</h1>
            <p className="mb-5">Invent, Implement, Impact</p>
            <button className="btn btn-primary" onClick={navigateToLoginPage}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
