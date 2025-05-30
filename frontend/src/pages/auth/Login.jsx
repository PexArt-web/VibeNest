import SharedButton from "../../Shared/Component/SharedButton";
import SharedInput from "../../Shared/Component/SharedInput";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
  const actionData = useActionData();
  console.log(actionData);
  const [error, setError] = useState(actionData?.error || null);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center px-4">
      <Form
        method="post"
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
            <SharedInput
              type={"text"}
              name={"identifier"}
              placeholder={"Enter username or email"}
              value={formData.identifier}
              onChange={handleChange}
              className={"bg-transparent outline-none flex-1"}
              required={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Password
          </label>
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <FaLock className="text-gray-500 mr-2" />
            <SharedInput
              type={"password"}
              name={"password"}
              placeholder={"Enter your password"}
              value={formData.password}
              onChange={handleChange}
              className={"bg-transparent outline-none flex-1"}
              required={true}
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <SharedButton
          type={"submit"}
          className={
            "w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 text-white font-semibold py-2 rounded-md"
          }
          label={
            navigation.state === "submitting"
              ? "Checking Credentials.."
              : "Login"
          }
        />
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-gray-600 text-center">
          <Link
            to="/forgot-password"
            className="text-purple-600 hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
