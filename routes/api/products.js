const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
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

router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const validateValues = await productsValidation.validateAddNewProductSchema(
      req.body
    );
    await productsModel.insertNewProduct({
      ...validateValues,
      img: req.file.filename,
    });
    res.json({ msg: "success" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
