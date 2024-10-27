import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavbarForRegistrationAndLoginPage from "./NavbarForRegistrationAndLoginPage";

const LayoutForRegistrationAndLogin = () => {
  return (
    <>
      <NavbarForRegistrationAndLoginPage />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutForRegistrationAndLogin;
