export const createVibeAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const content = formData.get("content");
    const image = formData.get("image");
    // const data = await
  } catch (error) {
    throw error;
  }
};
