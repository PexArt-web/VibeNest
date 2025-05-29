export const loginAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const identifier = formData.get("identifier");
    const password = formData.get("password");
    // const data = 
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
