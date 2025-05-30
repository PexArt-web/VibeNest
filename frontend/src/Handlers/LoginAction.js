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
    // if (!data?.user) {
    //   throw new Error("User not found");
    // }
    // if (!data?.user?.emailVerified) {
    //   throw new Error("Email not verified");
    // }
    return { user: data };
  } catch (error) {
    return {
      error: error?.message
        // error?.message ===
        //   "Error: getaddrinfo ENOTFOUND ghostconnect-shard-00-00.hjfmo.mongodb.net" ||
        // error?.message ===
        //   "Error: querySrv ETIMEOUT _mongodb._tcp.ghostconnect.hjfmo.mongodb.net"
        //   ? "Error connecting Please Retry"
        //   : error?.message,
    };
  }
};
