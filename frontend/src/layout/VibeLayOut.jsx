import Header from "../pages/Components/Header";
import Footer from "../pages/Components/Footer";
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
