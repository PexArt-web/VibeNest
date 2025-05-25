import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 text-white px-6">
      <motion.h1
        className="text-9xl font-extrabold mb-4 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        404
      </motion.h1>

      <p className="text-xl mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link to="home" className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
