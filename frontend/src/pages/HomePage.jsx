import { FaHeart, FaRetweet, FaComment } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SharedButton from "../Shared/Component/SharedButton";
import { useLoaderData } from "react-router-dom";

const dummyPosts = [
  {
    id: 1,
    user: "Pex",
    username: "@pex_dev",
    content: "Just launched VibeNest 🚀 — catch a vibe, drop a thought.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    user: "Lexa",
    username: "@lexa_artz",
    content: "UI so clean you could eat off it 😤💻",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

const HomePage = () => {
  const loaderData = useLoaderData()
  console.log("Loader Data:", loaderData);
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] 
    text-white p-19 "
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {dummyPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className=" bg-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 flex-wrap">
                <img
                  src={post.avatar}
                  alt={`${post.user} avatar`}
                  className="w-12 h-12 rounded-full border border-white/30"
                />
                <div>
                  <div className="font-semibold text-lg">{post.user}</div>
                  <div className="text-sm text-white/60">{post.username}</div>
                  <p className="mt-2 text-white/90">{post.content}</p>
                  <div className="flex gap-6 mt-3 text-white/70 text-sm">
                    <SharedButton
                      className={
                        "hover:text-pink-400 transition-colors duration-200 flex items-center gap-1"
                      }
                      label={
                        <>
                          <FaHeart /> 12
                        </>
                      }
                      whileTap={{ scale: 1.2 }}
                    />
                    <SharedButton
                      className={
                        "hover:text-green-400 transition-colors duration-200 flex items-center gap-1"
                      }
                      label={
                        <>
                          <FaRetweet /> 5
                        </>
                      }
                      whileTap={{ scale: 1.2 }}
                    />
                    <SharedButton
                      className={
                        "hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
                      }
                      label={
                        <>
                          <FaComment /> 3
                        </>
                      }
                      whileTap={{ scale: 1.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
