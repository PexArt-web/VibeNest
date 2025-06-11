import { uploadImageToCloud } from "../../Services/Cloud/cloudService";
import { createVibePost } from "../../Services/VibeServices/vibeService";

export const createVibeAction = async ({ request }) => {
  const formData = await request.formData();
  const content = formData.get("content");
  const image = formData.get("image");
  let imageUrl = null;
  if (!content && (!image || !image.size)) {
    return { error: "Content or Image is required" };
  }
  try {
    if (image && image.name && image.size > 0) {
      alert("Image is being uploaded, please wait...");
      if (!(image instanceof File)) {
        throw new Error("Invalid image file");
      }
      const data = await uploadImageToCloud(image);
      imageUrl = data;
    }
    const vibePostData = {
      content: content,
      ...(imageUrl && { imageUrl }),
    };
    const data = await createVibePost(vibePostData);
    return data;
  } catch (error) {
    return {
      error:
        error?.message ==
        `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
          ? "Please input a valid content or image"
          : `${error?.message}`,
    };
  }
};
