const pool = require("../config/db/db");

const createAddressService = async ({ country, street, distric, wards, city, detail, customer_id, id }) => {
    try {
        const rowEffect = await pool.query(`insert into address ( country, street, distric, wards, city, detail, customer_id, id) 
                        values ($1, $2, $3, $4, $5, $6, $7, $8)`, [country, street, distric, wards, city, detail, customer_id, id]);
        if (rowEffect.rowCount > 0) {
            const inserted = await pool.query(`select  country, street, distric, wards, city, detail, customer_id, id 
            from address where customer_id = $1 and id = $2`, [customer_id, id])
            return { msg: "Insertd address", status: true, inserted: inserted.rows };
        } else {
            return { msg: "Failed to insert address", status: false, inserted: null };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateAddressService = async ({ country, street, distric, wards, city, detail, customer_id, id }) => {
    try {
        const rowEffect = await pool.query(`update address set 
            country = $1, street = $2, distric = $3, wards = $4, city = $5, detail = $6 where customer_id = $7 and id = $8`, [country, street, distric, wards, city, detail, customer_id, id])
        if (rowEffect.rowCount > 0) {
            const updated = await pool.query(`select country, street, distric, wards, city, detail from address where customer_id = $1 and id = $2`, [customer_id, id]);
            return updated.rowCount !== 0 ? { msg: "Updated address", status: true, inserted: updated.rows } : { msg: "No address be updated", status: false, inserted: null };
        } else {
            return { msg: "Failed to updated address", status: false, inserted: null };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteAddressService = async ({ customer_id, id }) => {
    try {
        const rowEffect = await pool.query(`delete from address where customer_id = $1 and id = $2`, [customer_id, id]);

        if (rowEffect.rowCount > 0) {
            return { status: true };
        } else {
            return { status: false };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAddressService = async (customer_id) => {
    try {
        const selectedAddress = await pool.query(`select country, street, distric, wards, city, detail, customer_id, id 
        from address where customer_id = $1`, [customer_id]);
        if (selectedAddress.rowCount > 0) {
            return { status: true, result: selectedAddress.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getExactAddressService = async ({ customer_id, address_id }) => {
    try {
        const selectedAddress = await pool.query(`select country, street, distric, wards, city, detail, customer_id, id 
        from address where customer_id = $1 and id = $2`, [customer_id, address_id]);
        if (selectedAddress.rowCount > 0) {
            return { status: true, result: selectedAddress.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createAddressService, updateAddressService, deleteAddressService, getAddressService, getExactAddressService }