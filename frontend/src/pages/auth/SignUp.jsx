import { useState } from "react";
import { FaUser, FaAt, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Signup data", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your VibeNest Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaAt className="text-gray-500 mr-2" />
          <input
            type="text"
            name="username"
            placeholder="Username (e.g. @vibeninja)"
            value={formData.username}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full transition duration-300 font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
