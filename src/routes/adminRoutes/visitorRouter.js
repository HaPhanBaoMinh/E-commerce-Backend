const { getVisitorOnlineController } = require("../../controllers/adminControllers/visitorController");
const authAdmin = require("../../middleware/authAdmin");

const visitorAdminRouter = require("express").Router();

visitorAdminRouter.get("/", getVisitorOnlineController);

module.exports = { visitorAdminRouter }; 
