import { uploadImageToCloud } from "@/Services/Cloud/cloudService";
import { signupService } from "../../Services/Auth/signUpService";

export const signupAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const displayName = formData.get("displayName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const image = formData.get("avatar");
    let avatar = null;

    if (
      !displayName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !image ||
      image.size === 0
    ) {
      throw new Error("All fields are required from signupAction");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!email.includes("@") || !email.includes(".")) {
      throw new Error("Invalid email format");
    }
    if (image && image.name && image.size > 0) {
      if (!(image instanceof File)) {
        throw new Error("Invalid image file");
      }
      const data = await uploadImageToCloud(image);
      avatar = data;
    }
    const data = await signupService(
      displayName,
      username,
      email,
      password,
      avatar
    );
    if (data.error) {
      throw new Error(data.error);
    }

    return { user: data };
  } catch (error) {
    return {
      error:
        error.message ===
          "getaddrinfo ENOTFOUND ac-txuncwb-shard-00-00.rdoweue.mongodb.net" ||
        error.message === "read ECONNRESET" ||
        error.message === "Failed to fetch"
          ? "Error signing in please try again"
          : error.message,
    };
  }
};
