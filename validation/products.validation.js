const Joi = require("joi");
const validate = require("./validation");

const allProductsSchema = Joi.object({
  pageNum: Joi.number().min(1),
  itemsPerPage: Joi.number().min(1).max(300),
});

const validateAllProductsSchema = (productInput) =>
  validate(productInput, allProductsSchema);

module.exports = {
  validateAllProductsSchema,
};
