import Header from "../pages/Components/Header";
import Footer from "../pages/Components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { clientSocket, socket } from "@/Services/weBSocket";
import { useAuthContext } from "@/Hooks/useAuthContext";

const VibeLayOut = () => {
  const { user } = useAuthContext();
  console.log(user, "user")
  useEffect(() => {
    clientSocket();
    socket.on("connect", () => {
      const userInfo = { id: user?.user._id , username: user?.user.displayName};
      socket.emit("userInfo", userInfo);
    });

    return () =>{
      socket.off("connect")
    }
  }, [user]);
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
