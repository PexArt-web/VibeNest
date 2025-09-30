import Header from "../pages/Components/Header";
import Footer from "../pages/Components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { clientSocket, socket } from "@/Services/weBSocket";

const VibeLayOut = () => {
  useEffect(()=>{
    clientSocket()
    socket.on()
  }, [])
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
