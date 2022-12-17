const upload = require("../config/Upload/config");
const { readStoreController, updateStoreController } = require("../controllers/storeController");

const storeRouter = require("express").Router();

storeRouter.get("/", readStoreController);
storeRouter.put("/", upload.array("img", 2), updateStoreController);

module.exports = { storeRouter }; 