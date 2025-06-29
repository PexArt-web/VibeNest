const getAccessToken = async () => {
  const user = await JSON.parse(localStorage.getItem("user"));
  if (!user) {
    throw new Error("unauthorized user, please login again");
  }
  return user?.user?.token;
};

const checkResponse = (response, data) => {
  if (!response.ok) {
    if (
      data?.error === "Invalid token" ||
      data?.error === "Request is not authorized"
    ) {
      localStorage.removeItem("user");
      return null;
    }
    throw new Error(data?.error);
  }
};

export const createVibePost = async ({ content, imageUrl }) => {
  if (!content && !imageUrl) {
    throw new Error("Content and image URL are required to create a vibe post");
  }
  try {
    const response = await fetch("http://localhost:4000/api/user/create-vibe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, imageUrl }),
    });
    const data = await response.json();
    await checkResponse(response, data);
    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      error.message = "An unexpected error occurred. Please try again later.";
    }
    throw new Error(error.message);
  }
};

export const getVibes = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/user/get-vibes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    const data = await response.json();
    await checkResponse(response, data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteVibePost = async (id) => {
  if (!id) {
    throw new Error("Vibe ID is required to delete a vibe post");
  }
  try {
    const response = await fetch(
      `http://localhost:4000/api/user/delete-vibe/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    await checkResponse(response, data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const getUserProfile = async (id) => {
//   if (!id) {
//     throw new Error("User ID is required to fetch user profile");
//   }
//   try {
//     const response = await fetch(
//       `http://localhost:4000/api/user/get-userVibe/${id}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${await getAccessToken()}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     await checkResponse(response, data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const getUsersVibeById = async (id) => {
  console.log(id, "doc id")
  try {
    const response = await fetch(
      `http://localhost:4000/api/user/get-userVibe/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    await checkResponse(response, data);
    console.log(data,  "service data")
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createComment = async ({id, content, imageUrl})=>{
  console.log(id, "vibe comment")
  try {
    const response = await fetch(`http://localhost:4000/api/user/create-comment/${id}`,
      {
        method: "POST",
        headers:{
          Authorization:  `Bearer ${await getAccessToken()}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({content, imageUrl})
      }
    )
    const data = await response.json()
    await checkResponse(response, data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
