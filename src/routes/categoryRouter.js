const upload = require("../config/Upload/config");
const { postCategoryController, readCategoryController, deleteCategoryController, updateCategoryController } = require("../controllers/categoryController");

const categoryRouter = require("express").Router();

categoryRouter.post("/", upload.single("file"), postCategoryController);
categoryRouter.get("/", readCategoryController);
categoryRouter.delete("/", deleteCategoryController);
categoryRouter.put("/", upload.single("file"), updateCategoryController);

module.exports = { categoryRouter }; 