const { getVisitorOnlineController } = require("../../controllers/adminControllers/visitorController");

const visitorAdminRouter = require("express").Router();

visitorAdminRouter.get("/", getVisitorOnlineController);

module.exports = { visitorAdminRouter }; 
