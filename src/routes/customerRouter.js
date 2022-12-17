const { postCustomerController, readCustomerController, deleteCustomerController, updateCustomerController, loginCustomerController } = require("../controllers/customerController");

const customerRouter = require("express").Router();

customerRouter.post("/login", loginCustomerController);
customerRouter.post("/", postCustomerController);
customerRouter.get("/", readCustomerController);
customerRouter.delete("/", deleteCustomerController);
customerRouter.put("/", updateCustomerController);

module.exports = { customerRouter };