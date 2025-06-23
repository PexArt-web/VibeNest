import { FaHome, FaBell, FaFire, FaUser, FaCommentDots } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center py-3 md:py-4">
        <NavLink
          to={"home"}
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-blue-500 transition ${
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500"
            }`
          }
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        <NavLink
          to={"/notification"}
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-blue-500 transition ${
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500"
            }`
          }
        >
          <FaBell size={20} />
          <span className="text-xs mt-1">Alerts</span>
        </NavLink>
        <NavLink
          to={"trending"}
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-blue-500 transition ${
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500"
            }`
          }
        >
          <FaFire size={20} />
          <span className="text-xs mt-1">Trending</span>
        </NavLink>

        <NavLink
          to={"chat"}
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-blue-500 transition ${
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500"
            }`
          }
        >
          <MdMessage className=" text-xl" />
          <span className="text-xs mt-1">Chat</span>
        </NavLink>

        <NavLink
          to={"profile"}
          className={({ isActive }) =>
            `flex flex-col items-center hover:text-blue-500 transition ${
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-500"
            }`
          }
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
