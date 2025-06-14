import { FaHeart, FaRetweet, FaComment, FaFeatherAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import SharedButton from "../../Shared/Component/SharedButton";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Fallback from "@/Suspense/Fallback";

const HomePage = () => {
  const dataElements = useLoaderData();
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] 
    text-white p-19 "
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Suspense
            fallback={<Fallback/>}
          >
            <Await resolve={dataElements?.vibe}>
              {(vibeData) => (
                <>
                  {vibeData?.vibes.map((post) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4 flex-wrap">
                        <img
                          //remember to turn imageUrl to avatar
                          src={post.imageUrl}
                          alt={`${post.user} avatar`}
                          className="w-12 h-12 rounded-full border border-white/30"
                        />
                        <div>
                          <div className="font-semibold text-lg">
                            {post.userId?.displayName}
                          </div>
                          <div className="text-sm text-white/60">
                            {post.userId?.username}
                          </div>
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

                  <Footer />
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>

      <Link
        to="create-post"
        className="fixed bottom-20 md:bottom-30 right-4 md:right-16 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <FaFeatherAlt className="text-xl" />
      </Link>
    </>
  );
};

export default HomePage;
