import { revibe } from "@/Services/VibeServices/vibeService";

export const actionVibe = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const vibeId = formData.get("id");
  const content = formData.get("content");

  if (!vibeId) {
    return { error: "Vibe ID is required" };
  }
  console.log(actionType, "action type");
  console.log(vibeId, "vibe id");
  try {
    if (actionType === "revibe") {
      // if (!content) {
      //   return { error: "Content is required for reVibe" };
      // }
      const data = await revibe({ id: vibeId, content });
      return { message: "Post reVibed successfully", data };
    }
  } catch (error) {
    return { error: error.message };
  }
};
