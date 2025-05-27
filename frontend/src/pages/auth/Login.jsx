import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Logging in with:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Welcome Back to VibeNest
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Username or Email
          </label>
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="identifier"
              placeholder="Enter username or email"
              value={formData.identifier}
              onChange={handleChange}
              className="bg-transparent outline-none flex-1"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none flex-1"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white font-semibold py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
