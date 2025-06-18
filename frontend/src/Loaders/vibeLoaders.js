import { getUserProfile, getVibes } from "../Services/VibeServices/vibeService";
import { requireAuth } from "../Services/Middleware/requireAuth";
import { defer } from "react-router-dom";

export const homeVibeLoader = async ({ request }) => {
  await requireAuth(request);
  const vibe = getVibes();
  return defer({ vibe });
};

export const createPostLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const notificationLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const trendingLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const profileLoader = async ({ request }) => {
  await requireAuth(request);
  const user = await JSON.parse(localStorage.getItem("user"));
  if (!user) {
    throw new Error("Unauthorized user, please login again");
  }
  const userId = user?.user?._id;
  const usersVibe = await getUserProfile(userId);
  return defer({ usersVibe });
};
