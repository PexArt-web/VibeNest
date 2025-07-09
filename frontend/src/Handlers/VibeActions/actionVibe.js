import { revibe } from "@/Services/VibeServices/vibeService";

export const actionVibe = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const vibeId = formData.get("id");

  if (!vibeId) {
    return { error: "Vibe ID is required" };
  }

  try {
    if (actionType === "revibe") {
      const data = await revibe(vibeId);
      return { message: "Post reVibed successfully", data };
    }
  } catch (error) {
    return { error: error.message };
  }
};
