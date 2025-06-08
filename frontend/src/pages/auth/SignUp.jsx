import SharedInput from "../../Shared/Component/SharedInput";
import SharedButton from "../../Shared/Component/SharedButton";
import { FaUser, FaAt, FaEnvelope, FaLock } from "react-icons/fa";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";

const SignUp = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    if (actionData?.error) {
      setError(actionData.error || null);
    }
    if (actionData?.user?.message) {
      setMessage(actionData.user.message || null);
    }
    if (actionData && actionData?.user) {
      setError(null);
      setTimeout(() => {
        setMessage(null);
        navigate("/login");
      }, 5000);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 px-4">
      <Form
        method="post"
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your VibeNest Account
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaUser className="text-gray-500 mr-2" />
          <SharedInput
            type={"text"}
            name={"displayName"}
            placeholder={"Display Name"}
            className={"w-full outline-none bg-transparent"}
            required={true}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaAt className="text-gray-500 mr-2" />
          <SharedInput
            type={"text"}
            name={"username"}
            placeholder={"Username (e.g. @vibeninja"}
            className={"w-full outline-none bg-transparent"}
            required={true}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaEnvelope className="text-gray-500 mr-2" />
          <SharedInput
            type={"email"}
            name={"email"}
            placeholder={"Email Address"}
            className={"w-full outline-none bg-transparent"}
            required={true}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <SharedInput
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            className={"w-full outline-none bg-transparent"}
            required={true}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <SharedInput
            type={"password"}
            name={"confirmPassword"}
            placeholder={"Confirm Password"}
            className={"w-full outline-none bg-transparent"}
            required={true}
          />
        </div>

        <SharedButton
          type={"submit"}
          className={
            "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full transition duration-300 font-semibold"
          }
          disabled={navigation.state === "submitting"}
          label={
            navigation.state === "submitting" ? "Signing you up ..." : "Sign Up"
          }
        />
      </Form>
    </div>
  );
};

export default SignUp;
