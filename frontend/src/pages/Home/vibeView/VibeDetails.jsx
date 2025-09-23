import { useAuthContext } from "@/Hooks/useAuthContext";
import { deleteComment } from "@/Services/VibeServices/vibeService";
import SharedButton from "@/Shared/Component/SharedButton";
import SharedDropDown from "@/Shared/Component/SharedDropDown";
import SharedInput from "@/Shared/Component/SharedInput";
import Fallback from "@/Suspense/Fallback";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import {
  Await,
  Form,
  Link,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";

const VibeDetails = () => {
  const dataElements = useLoaderData();
  const [details, setDetails] = useState();
  const submit = useSubmit();
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const location = useLocation();
  const formRef = useRef();
  useEffect(() => {
    const vibeFetch = async () => {
      const vibe = (await dataElements?.vibeWithId) || [];
      setDetails(vibe);
    };
    vibeFetch();

    if (navigation.state === "idle") {
      formRef.current?.reset();
    }
  }, [dataElements?.vibeWithId, navigation.state]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 3000);
    }
  }, [location, dataElements]);

  const handleReVibe = (id) => {
    const formData = new FormData();
    formData.append("actionType", "revibe");
    formData.append("content", "");
    formData.append("id", id);
    submit(formData, { method: "POST" });
  };

  const handleReactions = (id) => {
    const formData = new FormData();
    formData.append("actionType", "like");
    formData.append("id", id);
    submit(formData, { method: "POST" });
  };

  // comment reaction functions

  const handleCommentLike = (id) => {
    const formData = new FormData();
    formData.append("actionType", "likeComment");
    formData.append("commentId", id);
    submit(formData, { method: "POST" });
  };

  const handleCommentRevibe = (id) => {
    const formData = new FormData();
    formData.append("actionType", "revibeComment");
    formData.append("content", "");
    formData.append("commentId", id);
    submit(formData, { method: "POST" });
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setDetails((prevPost) => ({
        ...prevPost,
        comment: prevPost.comment?.filter((post) => post._id !== id),
      }));
    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  };
  // console.log(details, "details");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white pt-20 pb-28 px-4">
      <div className="max-w-2xl mx-auto space-y-8 relative">
        <Suspense
          fallback={
            <Fallback
              loadingTitle="Loading Vibe..."
              titleFollowUp="Hold on a sec "
            />
          }
        >
          <Await resolve={dataElements?.vibeWithId}>
            {() => {
              return details?.vibe?.map((vibe) => (
                <div
                  key={vibe._id}
                  className="bg-white/10 p-6 rounded-2xl shadow-lg space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={vibe?.user?.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full border border-white/20"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {vibe?.user?.displayName || "Anonymous"}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {vibe?.user?.username || "username"}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="space-y-2">
                    <p className="text-base text-white/90">{vibe.content}</p>
                    {vibe.imageUrl && (
                      <img
                        src={vibe.imageUrl}
                        alt="Vibe image"
                        className="w-full rounded-xl mt-3 object-cover border border-white/20"
                      />
                    )}
                  </div>

                  {/*  */}
                  {vibe.isRevibe && vibe.originalVibeData && (
                    <Link
                      to={`/home/${vibe.originalVibeData._id}`}
                      className="cursor-pointer"
                    >
                      <div className="mt-4 border-l-4 border-green-500 pl-4 bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={vibe.originalVibeData.user?.avatar}
                            alt="Original Poster Avatar"
                            className="w-8 h-8 rounded-full border border-white/20"
                          />
                          <div>
                            <div className="text-sm font-medium text-white">
                              {vibe.originalVibeData.user?.displayName}
                            </div>
                            <div className="text-xs text-white/40">
                              {vibe.originalVibeData.user?.username}
                            </div>
                          </div>
                        </div>
                        <p className="text-white/80 text-sm">
                          {vibe.originalVibeData.content}
                        </p>
                        {vibe.originalVibeData.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={vibe.originalVibeData.imageUrl}
                              alt="Original Vibe"
                              className="rounded-lg w-full max-h-60 object-cover border border-white/20"
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  )}

                  {/*  */}
                  <div className="flex gap-6 justify-around text-white/70 text-sm border-t border-white/20 pt-3">
                    <SharedButton
                      className="hover:text-blue-400 flex items-center gap-1"
                      label={
                        <>
                          <FaComment /> {vibe.commentCount || 0}
                        </>
                      }
                      whileTap={{ scale: 1.2 }}
                    />
                    <SharedButton
                      className={`hover:text-green-400 flex items-center gap-1 ${
                        vibe?.reViberId?.includes(user?.user._id)
                          ? "text-green-400"
                          : "text-white/70"
                      }`}
                      label={
                        <>
                          <FaRetweet /> {vibe?.reViberId.length || 0}
                        </>
                      }
                      handleClick={() => handleReVibe(vibe._id)}
                      whileTap={{ scale: 1.2 }}
                    />

                    <SharedButton
                      className={`hover:text-pink-400 flex items-center gap-1 ${
                        vibe?.likes.includes(user?.user._id)
                          ? " text-pink-500"
                          : "text-white/70"
                      }`}
                      label={
                        <>
                          <FaHeart /> {vibe?.likes.length || 0}
                        </>
                      }
                      whileTap={{ scale: 1.2 }}
                      handleClick={() => handleReactions(vibe._id)}
                    />
                  </div>

                  {/* */}

                  <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    {vibe.commentCount > 0 ? (
                      details?.comment?.map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-white/5 p-3 rounded-lg backdrop-blur-sm space-y-2"
                          id={comment._id}
                          // onClick={()=>confirmId(comment?.userId)}
                        >
                          {/*  */}
                          <div className="flex items-center gap-3 justify-between">
                            <div>
                              <img
                                src={
                                  comment?.userId?.avatar ||
                                  "/default-avatar.png"
                                }
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border border-white/20"
                              />
                              <div>
                                <p className="text-sm font-semibold text-purple-300">
                                  {comment?.userId?.displayName || "user"}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {comment?.userId?.username}
                                </p>
                              </div>
                            </div>

                            {user?.user._id === comment?.userId._id && (
                              <div className="self-end sm:self-start">
                                <SharedDropDown
                                  parentLabel={<FiMoreVertical size={10} />}
                                  dropDownLabel={"Delete"}
                                  dropDownIcon={
                                    <FiTrash2 size={20} color="red" />
                                  }
                                  handleDelete={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                />
                              </div>
                            )}
                          </div>

                          {/*  */}
                          <p className="text-sm text-white leading-snug pl-11">
                            {comment.content}
                          </p>

                          {/*  */}
                          <div className="flex gap-6 text-xs text-white/70 mt-2 pl-11 justify-evenly">
                            <SharedButton
                              className="hover:text-blue-400 flex items-center gap-1"
                              label={
                                <>
                                  <FaComment /> {comment.commentCount || 0}
                                </>
                              }
                              whileTap={{ scale: 1.2 }}
                              disabled={true}
                            />

                            <SharedButton
                              className={`hover:text-green-400 flex items-center gap-1 ${
                                comment?.commentReviberId?.includes(
                                  user?.user._id
                                )
                                  ? "text-green-400"
                                  : "text-white/70"
                              }`}
                              label={
                                <>
                                  <FaRetweet />{" "}
                                  {comment?.commentReviberId?.length || 0}
                                </>
                              }
                              whileTap={{ scale: 1.2 }}
                              handleClick={() =>
                                handleCommentRevibe(comment._id)
                              }
                              // disabled={true}
                            />

                            <SharedButton
                              className={`hover:text-pink-400 flex items-center gap-1 ${
                                comment?.likes?.includes(user?.user._id)
                                  ? "text-pink-500"
                                  : "text-white/70"
                              }`}
                              label={
                                <>
                                  <FaHeart /> {comment?.likes?.length || 0}
                                </>
                              }
                              whileTap={{ scale: 1.2 }}
                              handleClick={() => handleCommentLike(comment._id)}
                              // disabled={true}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No comments yet ...
                      </p>
                    )}
                  </div>
                </div>
              ));
            }}
          </Await>
        </Suspense>

        {/* */}
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <Form
            method="post"
            className="flex items-center gap-2 max-w-2xl mx-auto bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg"
            encType="multipart/form-data"
            ref={formRef}
          >
            <div className="flex-1">
              <SharedInput
                type={"text"}
                name={"content"}
                placeholder={"Leave a comment..."}
                className={
                  "bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
                }
              />
            </div>
            <SharedButton
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              label={navigation.state === "submitting" ? "Posting..." : "Post"}
              disabled={navigation.state === "submitting"}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VibeDetails;
