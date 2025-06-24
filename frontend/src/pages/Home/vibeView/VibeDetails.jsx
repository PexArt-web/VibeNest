import SharedButton from "@/Shared/Component/SharedButton";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";

const VibeDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 mt-15">
      <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-2xl shadow-lg space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="w-14 h-14 rounded-full border border-white/30"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">User Name</h2>
            <p className="text-sm text-gray-400">@username</p>
          </div>
        </div>

        {/* Vibe Content */}
        <div>
          <p className="text-white/90 text-base leading-relaxed">
            This is where the vibe content will be shown. Could be text, could
            be an image, could be a feeling.
          </p>
          <img
            src="https://via.placeholder.com/400x200"
            alt="Post content"
            className="mt-4 rounded-lg w-full object-cover border border-white/20"
          />
        </div>

        {/* Comment Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-sm text-white">
                <span className="font-bold">@commenter</span> This is a comment.
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-sm text-white">
                <span className="font-bold">@anotheruser</span> Another comment
                here!
              </p>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="flex gap-6 justify-evenly mt-3 text-white/70 text-sm">
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
        <hr />

        {/* Comment Input */}
        <div>
          <form className="flex items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Leave a comment..."
              className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VibeDetails;
