const { postProductController, readProductsController, deleteProductsController, updateProductController, readBestSellersProductsController, readDiscountProductsController, readProductByskuController } = require("../controllers/productController");
const upload = require("../config/Upload/config");

const productRouter = require("express").Router();

productRouter.post("/", upload.array("files", 5), postProductController);
productRouter.get("/bestsellers", readBestSellersProductsController);
productRouter.get("/discount", readDiscountProductsController);
productRouter.get("/:sku", readProductByskuController);
productRouter.get("/", readProductsController);
productRouter.delete("/:sku", deleteProductsController);
productRouter.put("/", upload.array("newfiles", 5), updateProductController);

module.exports = { productRouter };


