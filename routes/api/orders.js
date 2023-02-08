const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const ordersModel = require("../../model/mysql/orders.model");

router.get("/:pageNum/:itemsPerPage", async (req, res) => {
  try {
    //! joi validation!!!!!!!
    const products = await ordersModel.findAllOrders(
      validateValues.pageNum,
      validateValues.itemsPerPage
    );
    res.json(products);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    //! joi validation!!!!!!!
    await ordersModel.insertNewOrder(req.body);
    res.json({ msg: "success" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// router.patch("/:id", async (req, res) => {
//   try {
//     //! joi validation!!!
//     await productsModel.updateProduct(req.params.id, req.body);
//     res.json({ msg: "success" });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     // const validateValues = await productsValidation.validateRemoveProductSchema(
//     //   req.params
//     // );
//     await productsModel.removeProduct(req.params.id);
//     res.json({ msg: "success" });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

module.exports = router;
