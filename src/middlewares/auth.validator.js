const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const jwtSchema = Joi.object({
  token: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });
  next();
};

const validateJwt = (req, res, next) => {
  const { error } = jwtSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      message: error.message,
    });
  next();
};

module.exports = {
  validateUser,
  validateJwt,
};
