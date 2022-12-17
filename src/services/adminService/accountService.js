const createId = require("../../utils/createId")
const pool = require("../../config/db/db");

const createAdminAccountService = async ({ firstname, lastname, email, password, role }) => {
    try {
        const adminId = createId("AD-");
        const result = await pool.query(`insert into adminAccount (firstname, lastname, email, password, role, id)
        values($1, $2, $3, $4, $5, $6)`, [firstname, lastname, email, password, role, adminId]);
        if (result.rowCount > 0) {
            return { status: true }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAdminAccountService = async () => {
    try {
        const result = await pool.query(`select firstname, lastname, password, role, email, id from adminaccount`);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows }
        }
        return { status: false, result: [] }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteAdminAccountService = async ({ id }) => {
    try {
        const result = await pool.query(`delete from adminaccount where id = $1`, [id]);
        if (result.rowCount > 0) {
            return { status: true }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateAdminAccountService = async ({ firstname, lastname, email, password, role, id }) => {
    try {
        const result = await pool.query(`update adminaccount 
        set firstname = $1, lastname = $2, email = $3, password = $4, role = $5 where id = $6`, [firstname, lastname, email, password, role, id]);
        if (result.rowCount > 0) {
            return { status: true }
        }
        return { status: false }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { createAdminAccountService, getAdminAccountService, deleteAdminAccountService, updateAdminAccountService }