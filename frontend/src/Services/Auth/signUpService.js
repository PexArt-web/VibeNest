export const signupService = async (displayName, username, email, password) => {
  try {
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName,
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data?.error}`);
    }
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
