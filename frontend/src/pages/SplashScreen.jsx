import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import SharedButton from "../Shared/Component/SharedButton";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return alert("to login page or to home page if logged in");

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-4"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <SparklesIcon className="h-12 w-12 text-white drop-shadow-lg" />
          </motion.div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-md mb-4">
          Welcome to VibeNest
        </h1>

        <p className="text-lg sm:text-xl text-white/90 max-w-md mx-auto mb-8">
          Your thoughts. Your space. A nest of vibes waiting to hatch.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <SharedButton
            className={
              "px-6 py-3 bg-white text-purple-700 font-semibold rounded-2xl shadow-lg hover:bg-purple-100 transition duration-300"
            }
            label={"Enter the Nest "}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
