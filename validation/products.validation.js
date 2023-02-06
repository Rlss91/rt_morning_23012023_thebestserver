const Joi = require("joi");
const validate = require("./validation");

const allProductsSchema = Joi.object({
  pageNum: Joi.number().min(1),
  itemsPerPage: Joi.number().min(1).max(300),
});

const addNewProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).trim().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().max(500).trim(),
});

const validateAllProductsSchema = (productInput) =>
  validate(productInput, allProductsSchema);

const validateAddNewProductSchema = (productInput) =>
  validate(productInput, addNewProductSchema);

module.exports = {
  validateAllProductsSchema,
  validateAddNewProductSchema,
};
