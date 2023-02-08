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

module.exports = {
  findAllProducts,
  insertNewProduct,
};
