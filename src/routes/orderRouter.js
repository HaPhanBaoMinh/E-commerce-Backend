const { createOrderController, readOrderCusIdController, readOrderByIdController, deleteOrderController, updateOrderController, readOrderDetailController } = require("../controllers/ordersController");

const orderRouter = require("express").Router();

orderRouter.post("/", createOrderController);
orderRouter.get("/customer", readOrderCusIdController);
orderRouter.get("/detail/:id", readOrderDetailController);
orderRouter.get("/:id", readOrderByIdController);
// orderRouter.delete("/", deleteOrderController);
orderRouter.put("/", updateOrderController);


module.exports = { orderRouter }; 
