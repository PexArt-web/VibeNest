import { loginService } from "../Services/Auth/loginService";

export const loginAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const identifier = formData.get("identifier");
    const password = formData.get("password");
    const data = await loginService(identifier, password);
    if (data.error) {
      throw new Error(data.error);
    }
    
    return { user: data };
  } catch (error) {
    return {
      error: error.message === "Failed to fetch" ? "An unexpected error occurred. Please try again later." : error.message
    };
  }
};
