import { getVibes } from "../Services/VibeServices/vibeService";
import { requireAuth } from "../Services/Middleware/requireAuth";
import { defer } from "react-router-dom";

export const homeVibeLoader = async ({ request }) => {
  await requireAuth(request);
  const vibe = await getVibes();
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

  return null;
};
