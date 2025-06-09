import { requireAuth } from "../Services/Middleware/requireAuth";

export const homeVibeLoader = async ({ request }) => {
  await requireAuth(request);

  return null;
};

export const createPostLoader = async ({request}) => {
  await requireAuth(request)

  return null
}

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
