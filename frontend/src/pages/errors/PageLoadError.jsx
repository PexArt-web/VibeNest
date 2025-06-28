import { Link, useLocation, useRouteError } from "react-router-dom";
import { FaBug } from "react-icons/fa";

const PageLoadError = () => {
  const error = useRouteError();
  const location = useLocation();
  const path = location.pathname;
  console.log(error, "errorPage")
  console.log(error?.message, "PageLoad Error")
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 via-purple-500 to-blue-600 text-white px-6 text-center">
      <FaBug className="text-5xl mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-lg mb-6">
        {error?.message === "Failed to fetch"
          ? "Error connecting , please check your connection and try again"
          : error?.message || "Page Load Error. Please try again later."}
      </p>
      <Link
        to={path}
        className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-purple-100 transition"
      >
        Retry
      </Link>
    </div>
  );
};

export default PageLoadError;
