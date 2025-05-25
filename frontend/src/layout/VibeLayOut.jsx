import Header from "../pages/components/Header";
import Footer from "../pages/components/Footer";
import { Outlet } from "react-router-dom";

const VibeLayOut = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VibeLayOut;
