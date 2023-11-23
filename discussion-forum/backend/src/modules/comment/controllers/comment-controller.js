import { postService } from "../../post/services/post-service.js";
import { commentService } from "../services/comment-service.js";
import { commentValidation } from "../validation/comment-validation.js";

export const commentOnPost = async (request, response, next) => {
  try {
    const slug = request.body.slug;
    const id = request.decoded.id;

    const post = await postService.getAPostBySlug(slug);
    if (!post)
      return response.status(400).json({
        error: "no post corresponding to the slug",
      });

    const comment_body = {
      "comment-content": request.body.content,
      author: id,
      post: post._id.toString(),
    };

    const result = commentValidation
      .commentOnPostSchema()
      .validate(comment_body);

    if (result.error) {
      return response.status(400).json({
        error: result.error.details[0].message,
      });
    }

    await commentService.commentOnPost(comment_body);
    response.status(200).json({ success: "comment created" });
  } catch (err) {
    next(err);
  }
};

export const getAllCommentsOfPostBySlug = async (request, response, next) => {
  try {
    const post = await postService.getAPostBySlug(request.query.slug);
    const comments = await commentService.getAllCommentsofPost(
      post._id.toString()
    );
    response.status(200).json({ commentts: comments });
  } catch (err) {
    next(err);
  }
};
