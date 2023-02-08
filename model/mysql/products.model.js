const knex = require("./connectToDb.sql");

const findAllProducts = (pageNum = 1, itemsPerPage = 20) => {
  return knex
    .select("*")
    .from("products")
    .limit(itemsPerPage)
    .offset((pageNum - 1) * itemsPerPage);
};

const insertNewProduct = (productData) => {
  return knex("products").insert(productData);
};

const removeProduct = (id) => {
  return knex("products").where("idproduct", id).del();
};

const updateProduct = (id, newData) => {
  return knex("products").where("idproduct", id).update(newData);
};

module.exports = {
  findAllProducts,
  insertNewProduct,
  removeProduct,
  updateProduct,
};
