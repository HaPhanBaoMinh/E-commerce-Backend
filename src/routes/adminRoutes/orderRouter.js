const { loginAdminAccountController } = require("../../controllers/adminControllers/adminAccountController");
const { getMonthlyOrderAdminController, getOrdersAdminController, updateOrderAdminController, getTotalEarningAdminController } = require("../../controllers/adminControllers/ordersController");
const { deleteOrderController } = require("../../controllers/ordersController");
const authAdmin = require("../../middleware/authAdmin");

const orderAdminRouter = require("express").Router();

orderAdminRouter.get("/all", getOrdersAdminController);
orderAdminRouter.get("/income", getTotalEarningAdminController);
orderAdminRouter.get("/", getMonthlyOrderAdminController);
orderAdminRouter.post("/login", loginAdminAccountController);
orderAdminRouter.post("/update", updateOrderAdminController);
orderAdminRouter.delete("/", deleteOrderController);

module.exports = { orderAdminRouter };
