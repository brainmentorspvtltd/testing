import Joi from "joi";

export const postValidation = {
  postSchema() {
    return Joi.object().keys({
      title: Joi.string().min(2).required(),
      text: Joi.string().min(2).required(),
      author: Joi.string().required(),
      slug: Joi.string().required(),
    });
  },
};
