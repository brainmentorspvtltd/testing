import { postValidation } from "../post-validation.js";
import { postService } from "../services/post-service.js";

export const createPost = async (request, response, next) => {
  try {
    const timestamp = new Date().getTime();
    const slug =
      timestamp + "-" + request.body.title.toLowerCase().replace(/\s+/g, "-");
    const post = {
      ...request.body,
      author: request.decoded.id,
      slug: `${slug}`,
    };

    const result = postValidation.postSchema().validate(post);

    if (result.error) {
      return response.status(400).json({
        error: result.error.details[0].message,
      });
    }

    await postService.createPost(post);
    response.status(200).json({ success: "post created" });
  } catch (err) {
    next(err);
  }
};

export const getAllPost = async (request, response, next) => {
  try {
    const allPost = await postService.getAllPost();
    response.status(200).json({ posts: allPost });
  } catch (err) {
    next(err);
  }
};
