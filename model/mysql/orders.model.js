const knex = require("./connectToDb.sql");

const findAllOrders = (pageNum = 1, itemsPerPage = 20) => {
  return knex
    .select("*")
    .from("orders")
    .limit(itemsPerPage)
    .offset((pageNum - 1) * itemsPerPage);
};

const insertNewOrder = (orderData) => {
  return knex("orders").insert(orderData);
};

const removeOrder = (id) => {
  return knex("orders").where("idorder", id).del();
};

const updateOrder = (id, newData) => {
  return knex("orders").where("idorder", id).update(newData);
};

module.exports = {
  findAllOrders,
  insertNewOrder,
  removeOrder,
  updateOrder,
};
