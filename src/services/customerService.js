const pool = require("../config/db/db");
const createId = require("../utils/createId");

const createCustomerService = async ({ lastname, firstname, email, phone, password }) => {
    try {
        const createat = new Date()
        const customer_id = createId("C-");
        const result = await pool.query(`insert into customer 
                                    (lastname, firstname, createat, email, phone, password, id) values
                                        ($1, $2, $3, $4, $5, $6, $7)`, [lastname, firstname, createat, email, phone, password, customer_id])
        //create cart
        if (result.rowCount > 0) {
            const inserted = await pool.query(`select lastname, firstname, createat, email, phone, password, id from customer where id = $1`, [customer_id])
            return { msg: "Insertd customer", status: true, inserted: inserted.rows };
        } else {
            return { msg: "Failed to customer product", status: false, inserted: null };
        }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const getCustomerService = async () => {
    try {
        const result = await pool.query(`select lastname, firstname, createat, email, phone, id from customer`);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const loginCustomerService = async ({ email, password }) => {
    try {
        const result = await pool.query(`select lastname, firstname, createat, email, phone, password, id 
        from customer where email = $1 and password=$2`, [email, password]);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows[0] };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}


const deleteCustomerService = async ({ id }) => {
    try {
        const result = await pool.query(`delete from customer where id = $1`, [id]);
        if (result.rowCount > 0) {
            return { status: true };
        } else {
            return { status: false };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateCustomerService = async ({ lastname, firstname, email, phone, password, id }) => {
    try {
        const result = await pool.query(`update customer 
                    set lastname = $1, firstname = $2, email = $3, phone= $4, password = $5 where id = $6`, [lastname, firstname, email, phone, password, id]);

        if (result.rowCount > 0) {
            const inserted = await pool.query(`select lastname, firstname, createat, email, phone, password, id from customer where id = $1`, [id])
            return { status: true, inserted: inserted.rows };
        } else {
            return { status: false, inserted: null };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createCustomerService, getCustomerService, deleteCustomerService, updateCustomerService, loginCustomerService }