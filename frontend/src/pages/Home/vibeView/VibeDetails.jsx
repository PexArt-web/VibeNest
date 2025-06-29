import SharedButton from "@/Shared/Component/SharedButton";
import SharedInput from "@/Shared/Component/SharedInput";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";

const VibeDetails = () => {
  const dataElements = useLoaderData();
  console.log(dataElements, "dataElements from vibe details");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-20 px-4 pb-28">
      <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-2xl shadow-xl space-y-6 relative">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-white/20"
          />
          <div>
            <h2 className="text-base font-semibold text-white leading-none">
              User Name
            </h2>
            <p className="text-xs text-gray-400">@username</p>
          </div>
        </div>

        {/* Vibe Content */}
        <div className="text-white/90 text-base leading-relaxed">
          This is where the vibe content will be shown. Could be text, could be
          an image, could be a feeling.
          <img
            src="https://via.placeholder.com/400x200"
            alt="Post content"
            className="mt-4 rounded-xl w-full object-cover border border-white/20"
          />
        </div>

        <div className="flex gap-6 justify-around text-white/70 text-sm border-t border-white/20 pt-3">
          <SharedButton
            className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
            label={
              <>
                <FaComment /> 3
              </>
            }
            whileTap={{ scale: 1.2 }}
          />
          <SharedButton
            className="hover:text-green-400 transition-colors duration-200 flex items-center gap-1"
            label={
              <>
                <FaRetweet /> 5
              </>
            }
            whileTap={{ scale: 1.2 }}
          />
          <SharedButton
            className="hover:text-pink-400 transition-colors duration-200 flex items-center gap-1"
            label={
              <>
                <FaHeart /> 12
              </>
            }
            whileTap={{ scale: 1.2 }}
          />
        </div>

        {/* Comment Section */}
        <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-2">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 p-3 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-white leading-snug">
                <span className="font-bold text-purple-300">@user{i}</span>{" "}
                Sample comment number {i + 1}
              </p>
            </div>
          ))}
        </div>

        <div className="fixed bottom-20 left-0 right-0 px-4 ">
          <Form
            encType="multipart/form-data"
            method="post"
            className="flex items-center gap-2 max-w-2xl mx-auto bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm shadow-lg"
          >
            {/* <SharedInput type={"text"} placeholder={"Leave a comment..."} className={"flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"}/> */}
            <input
              type="text"
              placeholder="Leave a comment..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"
              name="content"
            />
            <SharedButton
              type={"submit"}
              className={
                "bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              }
              label={"Send"}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VibeDetails;
