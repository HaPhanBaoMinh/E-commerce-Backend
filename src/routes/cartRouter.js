const { addNewItemToCartController, reomveItemInCartController, getCartController, resetCartController } = require("../controllers/cartController");
const cartRouter = require("express").Router();

cartRouter.post("/customer", getCartController);
cartRouter.post("/", addNewItemToCartController);
cartRouter.put("/", reomveItemInCartController);
cartRouter.delete("/", resetCartController);

module.exports = { cartRouter }