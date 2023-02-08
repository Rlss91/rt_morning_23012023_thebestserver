const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  img: { type: String },
});

/*
    create new collection and connect it to schema
*/
const Products = mongoose.model("products", productsSchema);

const findAllProducts = (pageNum = 1, itemsPerPage = 20) => {
  return Products.find()
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage);
};

const insertNewProduct = (productData) => {
  const newProduct = new Products(productData);
  return newProduct.save();
};

const removeProduct = (id) => {
  return Products.findByIdAndRemove(id);
};

module.exports = {
  findAllProducts,
  insertNewProduct,
  removeProduct,
};
