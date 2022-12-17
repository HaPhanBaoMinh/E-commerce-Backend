const { postAddressController, updateAddressController, deleteAddressController, getAddressController } = require("../controllers/addressController");

const addressRouter = require("express").Router();

addressRouter.post("/", postAddressController);
addressRouter.put("/", updateAddressController);
addressRouter.delete("/", deleteAddressController);
addressRouter.get("/:id", getAddressController);

module.exports = { addressRouter }