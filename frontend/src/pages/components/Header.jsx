import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 border-b border-gray-800 shadow-md z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6 items-center justify-between">
        <h1 className="text-xl font-bold text-purple-600 tracking-wide">
          VibeNest
        </h1>

        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full w-64">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Vibes..."
            className="bg-transparent focus:outline-none w-full text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
