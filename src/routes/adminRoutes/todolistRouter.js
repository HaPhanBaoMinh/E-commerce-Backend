const { createTodoController, getTodolistController, deleteTodolistController, updateTodolistController } = require("../../controllers/adminControllers/todolistController");

const todolistRouter = require("express").Router();

todolistRouter.post("/", createTodoController);
todolistRouter.get("/:id", getTodolistController);
todolistRouter.delete("/:id", deleteTodolistController);
todolistRouter.put("/", updateTodolistController);

module.exports = { todolistRouter }; 
