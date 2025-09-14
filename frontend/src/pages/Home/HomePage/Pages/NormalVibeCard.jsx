import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaComment, FaRetweet, FaHeart } from "react-icons/fa";
import moment from "moment";
import SharedButton from "../../../../Shared/Component/SharedButton";
import SharedDropDown from "../../../../Shared/Component/SharedDropDown";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";

const NormalVibeCard = ({ post, user, handleDelete, handleReVibe, handleReactions }) => {
  return (
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
                  dropDownIcon={<FiTrash2 size={20} color="red" />}
                  handleDelete={() => handleDelete(post._id)}
                />
              </div>
            )}
          </div>

          <Link to={post._id} className="cursor-pointer">
            <p className="mt-2 text-white/90 ">{post.content}</p>
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

          <div className="flex gap-6 border-t border-white/10 justify-between mt-3 text-white/70 text-sm">
            <Link to={post._id}>
              <SharedButton
                className="hover:text-blue-400 transition-colors duration-200 flex items-center cursor-pointer gap-1"
                label={<><FaComment /> {post.commentCount}</>}
                whileTap={{ scale: 1.2 }}
              />
            </Link>

            <SharedButton
              className={`hover:text-green-400 transition-colors cursor-pointer duration-200 flex items-center gap-1 ${
                post?.reViberId?.includes(user?.user._id)
                  ? "text-green-400"
                  : "text-white/70"
              }`}
              handleClick={() => handleReVibe(post._id)}
              label={<><FaRetweet /> {post.reViberId?.length || 0}</>}
              whileTap={{ scale: 1.2 }}
            />

            <SharedButton
              className={`hover:text-pink-400 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${
                post.likes?.includes(user?.user._id)
                  ? "text-pink-400"
                  : "text-white/70"
              }`}
              handleClick={() => handleReactions(post._id)}
              label={<><FaHeart /> {post.likes?.length || 0}</>}
              whileTap={{ scale: 1.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NormalVibeCard;
