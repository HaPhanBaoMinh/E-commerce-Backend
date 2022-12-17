const { createAdminAccountController, getAdminAccountController, deleteAdminAccountController, updateAdminAccountController } = require("../../controllers/adminControllers/adminAccountController");

const adminAccountRouter = require("express").Router();

adminAccountRouter.post("/", createAdminAccountController);
adminAccountRouter.get("/", getAdminAccountController);
adminAccountRouter.delete("/", deleteAdminAccountController);
adminAccountRouter.put("/", updateAdminAccountController);

module.exports = { adminAccountRouter }; 
