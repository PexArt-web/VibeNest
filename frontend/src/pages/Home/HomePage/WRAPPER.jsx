import { FaFeatherAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Await, Link, useLoaderData, useSubmit } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Fallback from "../../../Suspense/Fallback";
import { deleteVibePost } from "@/Services/VibeServices/vibeService";
import { useAuthContext } from "@/Hooks/useAuthContext";
import NormalVibeCard from "./Pages/NormalVibeCard";
import RevibedVibeCard from "./Pages/RevibedVibeCard";
import RevibedCommentCard from "./Pages/RevibedCommentCard";

const WRAPPER = () => {
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
      // setVibePosts((prevPosts) => ({
      //   ...prevPosts,
      //   vibes: prevPosts.vibes?.filter((post) => post._id !== id),
      // }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleReVibe = async (id) => {
    const formData = new FormData();
    formData.append("actionType", "revibe");
    formData.append("content", "");
    formData.append("id", id);
    submit(formData, { method: "POST" });
  };

  const handleReactions = async (id) => {
    const formData = new FormData();
    formData.append("actionType", "like");
    formData.append("id", id);
    submit(formData, { method: "POST" });
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] 
    text-white p-19 mt-2 mb-3"
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
              {() =>
                vibePosts?.vibes?.map((post) => (
                  <>
                    <div key={post._id}>
                      {!post.isRevibe && (
                        <NormalVibeCard
                          post={post}
                          user={user}
                          handleDelete={handleDelete}
                          handleReVibe={handleReVibe}
                          handleReactions={handleReactions}
                        />
                      )}
                    </div>
                    {post.isRevibe && post.originalVibeData && (
                      <RevibedVibeCard
                        post={post}
                        key={post._id}
                        user={user}
                        handleDelete={handleDelete}
                        handleReactions={handleReactions}
                      />
                    )}

                    {post.isRevibe && post.originalCommentData && (
                      <RevibedCommentCard
                        post={post}
                        key={post._id}
                        user={user}
                        handleDelete={handleDelete}
                        handleReactions={handleReactions}
                      />
                    )}
                  </>
                ))
              }
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

export default WRAPPER;
