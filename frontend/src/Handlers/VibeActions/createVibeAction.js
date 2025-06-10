import { createVibePost } from "../../Services/VibeServices/vibeService";

export const createVibeAction = async ({ request }) => {
    const formData = await request.formData();
    const content = formData.get("content");
    const image = formData.get("image");
    let imageUrl = null
    if (!content && !image) {
      return { error: "Content or Image is required" };
    }
  try {
    if(image){
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "pex_unsigned_preset");
        const response = await fetch("https://api.cloudinary.com/v1_1/ddyyfxfri/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json()
        if(!response.ok){
            throw new Error(data?.error)
        }
        imageUrl = data.secure_url
    }
    const vibePostData = {
        content : content,
        ...(imageUrl && {imageUrl})
    }
    const data = await createVibePost(vibePostData)
    return data
  } catch (error) {
    console.log(error)
    return {
      error: `Error posting document please retry`,
    };
  }
};
