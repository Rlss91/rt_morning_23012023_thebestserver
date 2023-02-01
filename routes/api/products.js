const express = require("express");
const router = express.Router();
const productsModel = require("../../model/products.model");
const productsValidation = require("../../validation/products.validation");

router.get("/:pageNum/:itemsPerPage", async (req, res) => {
  try {
    const validateValues = await productsValidation.validateAllProductsSchema(
      req.params
    );
    const products = await productsModel.findAllProducts(
      validateValues.pageNum,
      validateValues.itemsPerPage
    );
    res.json(products);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
