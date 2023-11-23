import Joi from "joi";

export const commentValidation = {
  commentOnPostSchema() {
    return Joi.object().keys({
      "comment-content": Joi.string().min(2).required(),
      author: Joi.string().required(),
      post: Joi.string().required(),
    });
  },
};
