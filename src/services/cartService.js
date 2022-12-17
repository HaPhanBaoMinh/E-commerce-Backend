const pool = require("../config/db/db");

const addNewProductToCartService = async ({ customer_id, sku, quantity }) => {
    try {
        const selectProductIncart = await pool.query(`select cart.quantity, product.discount_price from cart join product on cart.sku = product.sku 
        where cart.customer_id = $1 and cart.sku = $2`, [customer_id, sku]);
        // product is exist
        if (selectProductIncart.rowCount > 0) { // exist product in cart
            const currentQuantity = selectProductIncart.rows[0].quantity;
            const price = selectProductIncart.rows[0].discount_price;

            // update quantity, total in cart
            const rowEffect = await pool.query(`update cart set quantity = $1, total = $2 where sku = $3`, [Number(quantity) + currentQuantity, price * (Number(quantity) + currentQuantity), sku]);

            if (rowEffect.rowCount > 0) {
                return { status: true, msg: "updated quantity and total" };

            } else { // new product
                return { status: true, msg: "can not updated quantity and total" };
            }
        } else { //
            const getPriceOfProduct = await pool.query(`select discount_price from product where sku = $1`, [sku]);
            const price = getPriceOfProduct.rows[0].discount_price;
            const rowEffect = await pool.query(`insert into cart ( customer_id, sku, quantity, total ) values ($1, $2, $3, $4)`,
                [customer_id, sku, quantity, Number(quantity) * price]);

            if (rowEffect.rowCount > 0) {
                return { status: true, msg: 'inserted product' };

            } else { // new product
                return { status: true, msg: 'can not inserted product' };
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const removeProductFromCartService = async ({ customer_id, sku, quantity_remove }) => {
    try {
        const selectProductIncart = await pool.query(`select cart.quantity, product.discount_price from cart join product on cart.sku = product.sku 
            where cart.customer_id = $1 and cart.sku = $2`, [customer_id, sku]);
        if (selectProductIncart.rowCount > 0) {
            const currentQuantity = selectProductIncart.rows[0].quantity;
            const price = selectProductIncart.rows[0].discount_price;

            if (currentQuantity == quantity_remove) {
                const rowEffect = await pool.query(`delete from cart where sku = $1;`, [sku]);
                return rowEffect !== 0 ? { status: true, msg: "removed product" } : { status: false, msg: "no product removed" }
            }
            const rowEffect = await pool.query(`update cart set quantity = $1, total = $2 where sku = $3`, [currentQuantity - quantity_remove, Number(currentQuantity - quantity_remove) * price, sku]);
            return rowEffect !== 0 ? { status: true, msg: "update quantity and total product" } : { status: false, msg: "No Product Updated" }
        } else {
            return { status: false, msg: "product not exist" }
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCartService = async ({ customer_id }) => {
    try {
        const result = await pool.query(`select sku, quantity from cart where customer_id = $1`, [customer_id]);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        throw error;
    }
}

const resetCartService = async ({ customer_id }) => {
    try {
        const result = await pool.query(`delete from cart where customer_id = $1`, [customer_id]);
        if (result.rowCount > 0) {
            return { status: true, msg: 'Reseted cart' };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { addNewProductToCartService, removeProductFromCartService, getCartService, resetCartService }