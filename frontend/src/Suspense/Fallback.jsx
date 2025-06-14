import { motion } from "framer-motion";

const Fallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin mx-auto mb-6"
        />
        <h1 className="text-xl font-semibold">Loading your vibes...</h1>
        <p className="text-sm text-white/70 mt-2">Please vibe with us a sec..</p>
      </motion.div>
    </div>
  );
};

export default Fallback;
