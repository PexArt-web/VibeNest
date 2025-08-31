import {
  createComment,
  like,
  likeComment,
  revibe,
} from "@/Services/VibeServices/vibeService";

export const vibeComment = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const content = formData.get("content");
    const actionType = formData.get("actionType");
    const docId = formData.get("id");
    const commentId = formData.get("commentId");

   

    if (actionType === "like" && docId) {
      const data = await like(docId);
      return { message: "Vibe liked/un-liked successfully", data };
    } else if (actionType === "revibe" && docId) {
      const data = await revibe({ id: docId, content });
      return { message: "Post reVibed successfully", data };
    }else if (actionType === "likeComment" && commentId) {
      const data = await likeComment(commentId);
      return { message: "Comment liked/un-liked successfully", data };
    }

    let imageUrl = null;
    if (!content) {
      return { error: "Content or Image is Required" };
    }
    const { vibeId } = params;

    const vibeComment = {
      id: vibeId,
      content: content,
      ...(imageUrl & imageUrl),
    };

    const data = await createComment(vibeComment);
    return data;
  } catch (error) {
    return {
      error: error?.message,
    };
  }
};
