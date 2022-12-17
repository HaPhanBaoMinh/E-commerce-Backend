const pool = require("../../config/db/db");

const getTotalMonthlyOrderService = async () => {
    try {
        const currentYear = new Date().getFullYear()
        const selectMonthlyOrders = await pool.query(`SELECT count(id), EXTRACT(MONTH FROM createat) as Month FROM orders 
        WHERE EXTRACT(YEAR FROM createat) = $1 group by EXTRACT(MONTH FROM createat), EXTRACT(year FROM createat)`, [currentYear]);

        if (selectMonthlyOrders.rowCount > 0) {
            return { status: true, result: selectMonthlyOrders.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const getOrdersService = async () => {
    try {
        const selectOrders = await pool.query(`select 
        address_id, status, total, customer_id, orders.createat, orders.id, pay_method, lastname, firstname, phone, email 
        from orders join customer on orders.customer_id = customer.id 
        order by orders.createat desc`);

        if (selectOrders.rowCount > 0) {
            return { status: true, result: selectOrders.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const updateOrderStatusService = async ({ id, status }) => {
    try {

        const updateOrder = await pool.query("update orders set status = $1 where id = $2", [status, id])
        if (updateOrder.rowCount > 0) {
            return { status: true, result: updateOrder.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const totalEarningService = async () => {
    try {

        const selectOrders = await pool.query(`select sum(total), extract(month from createat) as month 
        from orders WHERE EXTRACT(YEAR FROM createat) = $1 and EXTRACT(month FROM createat) = $2 or EXTRACT(month FROM createat) = $3 group by EXTRACT(MONTH FROM createat), EXTRACT(year FROM createat)` , [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getMonth()]);

        if (selectOrders.rowCount > 0) {
            return { status: true, result: selectOrders.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = { getTotalMonthlyOrderService, getOrdersService, updateOrderStatusService, totalEarningService }