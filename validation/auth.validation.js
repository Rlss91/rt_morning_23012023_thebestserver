const Joi = require("joi");
const validate = require("./validation");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).alphanum().required().trim(),
  email: Joi.string().min(5).max(255).email().required().trim(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{0,}$")
    )
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.pattern.base": "password rules",
    }),
  avatar: Joi.string().trim(),
});

const validateRegisterSchema = (userInput) =>
  validate(userInput, registerSchema);

module.exports = {
  validateRegisterSchema,
};
