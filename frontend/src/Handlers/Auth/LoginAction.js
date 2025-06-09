import { loginService } from "../../Services/Auth/loginService";

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
    console.error("Login action error:", error);
    return {
      error: error.message === "Failed to fetch" || error.message === "getaddrinfo ENOTFOUND ac-txuncwb-shard-00-00.rdoweue.mongodb.net" || error.message === "connect ETIMEDOUT 65.62.36.156:27017" || error.message === "connect ETIMEDOUT 65.62.36.112:27017" ? "An unexpected error occurred. Please try again later." : error.message
    };
  }
};
