export const createVibePost = async ({ content, imageUrl }) => {
  try {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (!user) {
      throw new Error("unauthorized user, please login again");
    }
    const token = user?.user?.token;
    const response = await fetch("http://localhost:4000/api/user/create-vibe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, imageUrl }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("Error creating vibe post:", data?.error);
      if (
        data?.error == "Invalid token" ||
        data?.error == "Request is not authorized"
      ) {
        localStorage.removeItem("user");
        return null;
        // window.location.href = "/login";
        // throw new Error("Session expired, please login again");
      }
      throw new Error(data?.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
