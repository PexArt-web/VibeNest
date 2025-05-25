import { FaHome, FaBell, FaFire, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  console.log(location.pathname);
  const isHomepage = location.pathname === "/home";
  const isNotification = location.pathname === "/notification";
  const isTrending = location.pathname === "/trending";
  const isProfilePage = location.pathname === "/profile"
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center py-3 md:py-4">
        <Link
          to={"/home"}
          className={`flex flex-col items-center ${
            isHomepage ? `text-blue-500` : `text-gray-600`
          } hover:text-blue-500 transition`}
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to={"/notification"}
          className={`flex flex-col items-center ${
            isNotification ? `text-blue-500` : `text-gray-600`
          } hover:text-blue-500 transition`}
        >
          <FaBell size={20} />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link
          to={"/trending"}
          className={`flex flex-col items-center ${
            isTrending ? `text-blue-500` : `text-gray-600`
          } hover:text-blue-500 transition`}
        >
          <FaFire size={20} />
          <span className="text-xs mt-1">Trending</span>
        </Link>
        <Link
          to={"/profile"}
          className={`flex flex-col items-center ${ isProfilePage ? `text-blue-500` :`text-gray-600`} hover:text-blue-500 transition`}
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
