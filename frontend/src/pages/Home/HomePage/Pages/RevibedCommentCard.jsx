import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RevibedCommentCard = ({ post , checkID }) => {
    console.log(post, "from comment post")
  return (
    <motion.div
      key={post._id}
      whileHover={{ scale: 1.02 }}
      className="bg-blue-900/20 rounded-2xl p-4 shadow-md border border-blue-500/30 hover:shadow-lg transition-shadow duration-300"
      onClick={()=>checkID(post._id)}
    >
      <p className="text-green-400 text-xs mb-2">
        🔁 {post.user?.displayName} revibed a comment
      </p>
      <Link to={post.originalCommentData._id} className="cursor-pointer">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.originalCommentData.user?.avatar}
            alt="Original Commenter Avatar"
            className="w-8 h-8 rounded-full border border-white/20"
          />
          <div>
            <div className="text-sm font-medium text-white">
              {post.originalCommentData.user?.displayName}
            </div>
            <div className="text-xs text-white/40">
              {post.originalCommentData.user?.username}
            </div>
          </div>
        </div>
        <p className="text-white/80 text-sm">
          {post.originalCommentData.content}
        </p>
        {post.originalCommentData.imageUrl && (
          <div className="mt-2">
            <img
              src={post.originalCommentData.imageUrl}
              alt="Original Comment"
              className="rounded-lg w-full max-h-60 object-cover border border-white/20"
            />
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default RevibedCommentCard;
