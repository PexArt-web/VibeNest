import { FaHeart, FaRetweet, FaComment, FaFeatherAlt } from "react-icons/fa";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import SharedButton from "../../Shared/Component/SharedButton";
import { Await, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Fallback from "../../Suspense/Fallback";
import SharedDropDown from "@/Shared/Component/SharedDropDown";
import { deleteVibePost } from "@/Services/VibeServices/vibeService";
import { useAuthContext } from "@/Hooks/useAuthContext";
import moment from "moment";
const HomePage = () => {
  const dataElements = useLoaderData();
  const submit = useSubmit();
  const { user } = useAuthContext();
  const [vibePosts, setVibePosts] = useState([]);

  useEffect(() => {
    const fetchVibePosts = async () => {
      const vibePosts = (await dataElements?.vibe) || [];
      setVibePosts(vibePosts);
    };
    fetchVibePosts();
  }, [dataElements]);

  const handleDelete = async (id) => {
    try {
      await deleteVibePost(id);
      setVibePosts((prevPosts) => ({
        ...prevPosts,
        vibes: prevPosts.vibes?.filter((post) => post._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleReVibe = async (id) => {
    alert("ReVibe functionality is not implemented yet." + " " + id);
    const formData = new FormData();
    formData.append("actionType", "revibe");
    formData.append("content", "ReVibed post");
    formData.append("id", id);
    submit(formData, { method: "POST" });
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] 
    text-white p-19 "
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Suspense
            fallback={
              <Fallback
                loadingTitle={"Loading your vibes..."}
                titleFollowUp={"Please vibe with us a sec.."}
              />
            }
          >
            <Await resolve={dataElements?.vibe}>
              {() => {
                return vibePosts?.vibes?.map(
                  (post) => (
                    // console.log(post, "post from vibe home page"),
                    console.log(post, "post from vibe home page"),
                    (
                      <motion.div
                        key={post._id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-start gap-4 flex-wrap">
                          <img
                            src={post.user?.avatar}
                            alt={`${post.user?.displayName} avatar`}
                            className="w-12 h-12 rounded-full border border-white/30"
                          />

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full gap-2 sm:gap-4">
                              <div>
                                <div className="font-semibold text-lg text-white">
                                  {post.user?.displayName}
                                </div>
                                <div className="text-sm text-white/60">
                                  {post.user?.username}
                                </div>
                              </div>

                              <div className="text-xs text-white/40 mt-1">
                                {moment(post.createdAt).fromNow()}
                              </div>

                              {user?.user._id === post?.userId && (
                                <div className="self-end sm:self-start">
                                  <SharedDropDown
                                    parentLabel={<FiMoreVertical size={10} />}
                                    dropDownLabel={"Delete"}
                                    dropDownIcon={
                                      <FiTrash2 size={20} color="red" />
                                    }
                                    handleDelete={() => handleDelete(post._id)}
                                  />
                                </div>
                              )}
                            </div>

                            <Link to={post._id}>
                              <p className="mt-2 text-white/90">
                                {post.content}
                              </p>
                              {post.imageUrl && (
                                <div className="mt-4">
                                  <img
                                    src={post.imageUrl}
                                    alt="User post"
                                    className="rounded-lg w-full max-h-96 object-cover border border-white/20"
                                  />
                                </div>
                              )}
                            </Link>
                            {post.isRevibe && post.originalVibeData && (
                              <div className="mt-4 border-l-4 border-purple-500 pl-4 bg-white/5 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <img
                                    src={post.originalVibeData.user?.avatar}
                                    alt="Original Poster Avatar"
                                    className="w-8 h-8 rounded-full border border-white/20"
                                  />
                                  <div>
                                    <div className="text-sm font-medium text-white">
                                      {post.originalVibeData.user?.displayName}
                                    </div>
                                    <div className="text-xs text-white/40">
                                      {post.originalVibeData.user?.username}
                                    </div>
                                  </div>
                                </div>
                                <p className="text-white/80 text-sm">
                                  {post.originalVibeData.content}
                                </p>
                                {post.originalVibeData.imageUrl && (
                                  <div className="mt-2">
                                    <img
                                      src={post.originalVibeData.imageUrl}
                                      alt="Original Vibe"
                                      className="rounded-lg w-full max-h-60 object-cover border border-white/20"
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="flex gap-6 justify-evenly mt-3 text-white/70 text-sm">
                              <Link to={post._id}>
                                <SharedButton
                                  className={
                                    "hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
                                  }
                                  label={
                                    <>
                                      <FaComment /> {post.commentCount}
                                    </>
                                  }
                                  whileTap={{ scale: 1.2 }}
                                />
                              </Link>

                              <SharedButton
                                className={`hover:text-green-400 transition-colors duration-200 flex items-center gap-1 ${
                                  post._id == post.originalVibeData._id
                                    ? "text-green-400"
                                    : "text-white/70"
                                }`}
                                handleClick={() => handleReVibe(post._id)}
                                label={
                                  <>
                                    <FaRetweet /> 5
                                  </>
                                }
                                whileTap={{ scale: 1.2 }}
                              />

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
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )
                );
              }}
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
