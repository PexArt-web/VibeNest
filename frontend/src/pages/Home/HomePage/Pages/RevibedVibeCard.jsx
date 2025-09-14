import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SharedButton from "@/Shared/Component/SharedButton";
import { FaHeart, FaRetweet, FaComment, FaFeatherAlt } from "react-icons/fa";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";

import { useAuthContext } from "@/Hooks/useAuthContext";
import SharedDropDown from "@/Shared/Component/SharedDropDown";

const RevibedVibeCard = ({ post }) => {
  const { user } = useAuthContext();
  return (
  <motion.div
  key={post._id}
  whileHover={{ scale: 1.02 }}
  className="bg-purple-900/20 rounded-2xl p-4 shadow-md border border-purple-500/30 
             hover:shadow-lg transition-shadow duration-300 space-y-3"
>
  {/* Revibed label */}
  <p className="text-green-400 text-xs flex items-center gap-1">
    🔁 {post.user?.displayName} <span className="text-white/50">revibed</span>
  </p>

  <Link to={post.originalVibeData._id} className="block cursor-pointer">
    {/* Header section (avatar + name + dropdown) */}
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <img
          src={post.originalVibeData.user?.avatar}
          alt="Original Poster Avatar"
          className="w-10 h-10 rounded-full border border-white/20"
        />
        <div>
          <div className="text-sm font-semibold text-white">
            {post.originalVibeData.user?.displayName}
          </div>
          <div className="text-xs text-white/50">
            {post.originalVibeData.user?.username}
          </div>
        </div>
      </div>
      
      {user?.user._id === post?.userId && (
        <SharedDropDown
          parentLabel={<FiMoreVertical size={16}  />}
          dropDownLabel="Delete"
          dropDownIcon={<FiTrash2 size={18} className="text-red-500" />}
          handleDelete={() => handleDelete(post._id)}
        />
      )}

    </div>

    {/* Content */}
    <p className="text-white/90 text-sm leading-relaxed">
      {post.originalVibeData.content}
    </p>

    {/* Image */}
    {post.originalVibeData.imageUrl && (
      <div className="mt-3">
        <img
          src={post.originalVibeData.imageUrl}
          alt="Original Vibe"
          className="rounded-lg w-full max-h-72 object-cover border border-white/20"
        />
      </div>
    )}
  </Link>

  {/* Actions */}
  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-white/70 text-sm">
    <Link to={post._id}>
      <SharedButton
        className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
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
        post?.reViberId?.includes(user?.user._id) ? "text-green-400" : ""
      }`}
      handleClick={() => handleReVibe(post._id)}
      label={
        <>
          <FaRetweet /> {post.reViberId?.length || 0}
        </>
      }
      whileTap={{ scale: 1.2 }}
    />

    <SharedButton
      className={`hover:text-pink-400 transition-colors duration-200 flex items-center gap-1 ${
        post.likes?.includes(user?.user._id) ? "text-pink-400" : ""
      }`}
      handleClick={() => handleReactions(post._id)}
      label={
        <>
          <FaHeart /> {post.likes?.length || 0}
        </>
      }
      whileTap={{ scale: 1.2 }}
    />
  </div>
</motion.div>

  );
};

export default RevibedVibeCard;
