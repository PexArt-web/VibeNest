import SharedButton from "@/Shared/Component/SharedButton";
import SharedInput from "@/Shared/Component/SharedInput";
import Fallback from "@/Suspense/Fallback";
import { Suspense, useEffect, useState } from "react";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";
import { Await, Form, useLoaderData } from "react-router-dom";

const VibeDetails = () => {
  const dataElements = useLoaderData();
  console.log(dataElements, "dataElements in VibeDetails");
  const [details, setDetails] = useState();
  useEffect(() => {
    const vibeFetch = async () => {
      const vibe = (await dataElements?.vibeWithId) || [];
      setDetails(vibe);
      console.log(vibe, "vibe from useEffect");
    };
    vibeFetch();
  }, [dataElements?.vibeWithId]);

  console.log(details?.comment.length, "length");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-20 pb-28 px-4">
      <div className="max-w-2xl mx-auto space-y-8 relative">
        <Suspense
          fallback={
            <Fallback
              loadingTitle="Loading Vibe..."
              titleFollowUp="Hold on a sec 🔄"
            />
          }
        >
          <Await resolve={dataElements?.vibeWithId}>
            {() => {
              return details?.vibe?.map(
                (vibe) => (
                  console.log(vibe, "vibe from details"),
                  (
                    <div
                      key={vibe._id}
                      className="bg-white/10 p-6 rounded-2xl shadow-lg space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={vibe?.userId?.avatar || "/default-avatar.png"}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full border border-white/20"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {vibe?.userId?.displayName || "Anonymous"}
                          </h2>
                          <p className="text-sm text-gray-400">
                            {vibe?.userId?.username || "username"}
                          </p>
                        </div>
                      </div>

                      {/* */}
                      <div className="space-y-2">
                        <p className="text-base text-white/90">
                          {vibe.content}
                        </p>
                        {vibe.imageUrl && (
                          <img
                            src={vibe.imageUrl}
                            alt="Vibe image"
                            className="w-full rounded-xl mt-3 object-cover border border-white/20"
                          />
                        )}
                      </div>

                      {/*  */}
                      <div className="flex gap-6 justify-around text-white/70 text-sm border-t border-white/20 pt-3">
                        <SharedButton
                          className="hover:text-blue-400 flex items-center gap-1"
                          label={
                            <>
                              <FaComment /> {details?.comment.length || 0}
                            </>
                          }
                          whileTap={{ scale: 1.2 }}
                        />
                        <SharedButton
                          className="hover:text-green-400 flex items-center gap-1"
                          label={
                            <>
                              <FaRetweet /> 0
                            </>
                          }
                          whileTap={{ scale: 1.2 }}
                        />
                        <SharedButton
                          className="hover:text-pink-400 flex items-center gap-1"
                          label={
                            <>
                              <FaHeart /> 0
                            </>
                          }
                          whileTap={{ scale: 1.2 }}
                        />
                      </div>

                      {/* */}
                      <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        {details?.comment?.length > 0 ? (
                          details?.comment.map(
                            (comment) => (
                              console.log(comment, "comment from details"),
                              (
                                <div
                                  key={comment._id}
                                  className="bg-white/5 p-3 rounded-lg backdrop-blur-sm"
                                >
                                  <p className="text-sm text-white leading-snug">
                                    <span className="font-bold text-purple-300">
                                      {comment?.userId?.username || "user"}
                                    </span>{" "}
                                    {comment.content}
                                  </p>
                                </div>
                              )
                            )
                          )
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No comments yet 🫠
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )
              );
            }}
          </Await>
        </Suspense>

        {/* */}
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <Form
            method="post"
            className="flex items-center gap-2 max-w-2xl mx-auto bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg"
            encType="multipart/form-data"
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              label="Send"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VibeDetails;
