const express = require("express")
const { requireAuth } = require("../Middleware/requireAuth");
const { createComment, getComments, commentLikeOrUnlike, commentRevibe, deleteComment } = require("../Controller/commentController");
const router = express.Router()

router.use(requireAuth)

router.post("/create-comment/:id", createComment);

router.get("/get-comments/:id", getComments);

router.post("/:commentId/like", commentLikeOrUnlike);

router.post("/:commentId/reply", commentRevibe)

router.delete("/delete-comment/:id", deleteComment )


module.exports = router