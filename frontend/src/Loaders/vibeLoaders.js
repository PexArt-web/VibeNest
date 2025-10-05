import {
  fetchNotification,
  getUserProfile,
  getVibeById,
  getVibes,
} from "../Services/VibeServices/vibeService";
import { requireAuth } from "../Services/Middleware/requireAuth";
import { defer } from "react-router-dom";

export const homeVibeLoader = async ({ request }) => {
  await requireAuth(request);
  const vibe = getVibes();
  return defer({ vibe });
};

export const vibeById = async ({ params }) => {
  await requireAuth();
  const { vibeId } = params;
  const vibeWithId = getVibeById(vibeId);
  return defer({ vibeWithId });
};

export const createPostLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const notificationLoader = async ({ request }) => {
  await requireAuth(request);
  const notification = fetchNotification();
  return defer({ notification });
};

export const trendingLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const profileLoader = async ({ request, params }) => {
  await requireAuth(request);
  const { userId } = params;
  const usersVibe = getUserProfile(userId);
  return defer({ usersVibe });
};
