import { like, revibe } from "@/Services/VibeServices/vibeService";

export const actionVibe = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const vibeId = formData.get("id");
  const content = formData.get("content");

  if (!vibeId) {
    return { error: "Vibe ID is required" };
  }

  try {
    if (actionType === "revibe") {
      // if (!content) {
      //   return { error: "Content is required for reVibe" };
      // }
      const data = await revibe({ id: vibeId, content });
      return { message: "Post reVibed successfully", data };
    }else if(actionType === "like"){
      const data = await like(vibeId);
      return { message: "Vibe liked/unliked successfully", data };
    }else{
      return null
    }
  } catch (error) {
    return { error: error.message };
  }
};

