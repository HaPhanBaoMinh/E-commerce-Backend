const { createTodoService, getTodoService, deleteTodoService, updateTodolistService } = require("../../services/adminService/todolistService");

const createTodoController = async (req, res) => {
    try {
        const result = await createTodoService({ ...req.body });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const getTodolistController = async (req, res) => {
    try {
        const admin_id = await req.params.id;
        const result = await getTodoService(admin_id);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteTodolistController = async (req, res) => {
    try {
        const todoId = await req.params.id;
        const result = await deleteTodoService(todoId);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const updateTodolistController = async (req, res) => {
    try {
        const result = await updateTodolistService({ ...req.body });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { createTodoController, getTodolistController, deleteTodolistController, updateTodolistController }