import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RevibedVibeCard = ({ post }) => {
  console.log(post, "from rvibed card")
  return (
    <motion.div
      key={post._id}
      whileHover={{ scale: 1.02 }}
      className="bg-purple-900/20 rounded-2xl p-4 shadow-md border border-purple-500/30 hover:shadow-lg transition-shadow duration-300"
    >
      <p className="text-green-400 text-xs mb-2">
        🔁 {post.user?.displayName} revibed
      </p>
      <Link to={post.originalVibeData._id} className="cursor-pointer">
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
      </Link>
    </motion.div>
  );
};

export default RevibedVibeCard;
