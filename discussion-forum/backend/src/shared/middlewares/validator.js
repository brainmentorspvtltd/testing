export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    //   if (!req.value) {
    //     req.value = {};
    //     return res.status(400).json({
    //         error: 'Empty Request',
    //       });
    //   }
    //   req.value['body'] = result.value;
    next();
  };
};
