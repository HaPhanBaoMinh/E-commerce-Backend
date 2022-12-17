const { getMonthlyOrderAdminController, getOrdersAdminController, updateOrderAdminController, getTotalEarningAdminController } = require("../../controllers/adminControllers/ordersController");
const { deleteOrderController } = require("../../controllers/ordersController");

const orderAdminRouter = require("express").Router();

orderAdminRouter.get("/", getMonthlyOrderAdminController);
orderAdminRouter.get("/all", getOrdersAdminController);
orderAdminRouter.get("/income", getTotalEarningAdminController);
orderAdminRouter.post("/update", updateOrderAdminController);
orderAdminRouter.delete("/", deleteOrderController);

module.exports = { orderAdminRouter };
