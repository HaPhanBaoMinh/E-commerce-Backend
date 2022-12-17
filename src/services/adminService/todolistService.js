const pool = require("../../config/db/db");
const createId = require("../../utils/createId");

const createTodoService = async ({ adminid, content }) => {
    try {
        const todoId = createId("TD-")
        const result = await pool.query(`insert into todolist (adminid, content, status, id)
        values($1, $2, $3, $4)`, [adminid, content, 'todo', todoId]);
        if (result.rowCount > 0) {
            return { status: true, id: todoId }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTodoService = async (adminid) => {
    try {
        const result = await pool.query(`select adminid, id,  content, status from todolist where adminid = $1`, [adminid]);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows }
        }
        return { status: false, result: [] }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteTodoService = async (id) => {
    try {
        const result = await pool.query(`delete from todolist where id = $1`, [id]);
        if (result.rowCount > 0) {
            return { status: true }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTodolistService = async ({ status, id }) => {
    try {
        const result = await pool.query(`update todolist 
        set status = $1 where id = $2`, [status, id]);
        if (result.rowCount > 0) {
            return { status: true }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { createTodoService, getTodoService, deleteTodoService, updateTodolistService }