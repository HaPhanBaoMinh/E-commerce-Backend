const pool = require("../config/db/db");
const createId = require("../utils/createId");
const { getExactAddressService, createAddressService } = require("./addressService");
const { createCustomerService } = require("./customerService");

// if add new address pls filling a new address_id
const createOrderService = async ({ lastname, firstname, email, phone, address_id, country, street, distric, wards, city, detail, items, order_id, password, pay_method }) => {
    try {
        const customer_id = createId("C-");

        //1. Check customer => not exist => insert customer => id
        const userInfo = await pool.query(`select id from customer where email = $1`, [email]);
        const isNewUser = userInfo.rowCount == 0;

        let customerId = null;
        let AddressId = null;

        // New customer
        if (isNewUser) {
            const createat = new Date();
            try {
                const { inserted } = await createCustomerService({ lastname, firstname, email, phone, id: customer_id, createat })
                customerId = await inserted[0].id;
            } catch (error) {
                return { msg: "Invalid Format", status: false };
            }

            if (password && password.length > 0) {
                await pool.query(`update customer set password = $1 where id = $2`, [password, customerId]);
            }
        } else {
            const { rows } = await pool.query(`select id from customer where email = $1`, [email]);
            customerId = await rows[0].id;
            if (password && password.length > 0) {
                await pool.query(`update customer set password = $1 where id = $2`, [password, customerId]);
            }
        }

        const addressInfo = await pool.query(`select id from address where customer_id = $1 and id = $2`, [customerId, address_id]);
        const isNewAddress = addressInfo.rowCount === 0;

        //2. Check address => not exist => insert address => 
        if (!isNewAddress) { // customer use old address
            const { result } = await getExactAddressService({ customer_id: customerId, address_id });
            AddressId = result[0].id;
        } else {
            const address_id = createId("AD-");
            const { inserted } = await createAddressService({ country, street, distric, wards, city, detail, customer_id: customerId, id: address_id })
            AddressId = inserted[0].id;
        }

        //3. caculate total of order => insert to Orders table
        const itemsInOrder = items.map(item => item.sku);
        const { rows } = await pool.query(`select sku, discount_price, price, quantity, day_end_discount from product where sku = ANY($1)`, [itemsInOrder])
        const productInfo = rows;

        if (productInfo.length == 0) {
            return { msg: "Incorrect sku", status: false };
        }

        const validQuantity = await checkValidQuantity(items, productInfo);

        if (!validQuantity) {
            return { msg: "Over quantity", status: false };
        }
        let totalOfOrder = 0;
        const formatProductInfo = productInfo.reduce((acc, cur) => {

            const saleDate = Date.parse(cur.day_end_discount);

            if (saleDate > Date.now()) {
                return { ...acc, [cur.sku]: cur.discount_price }
            }
            return { ...acc, [cur.sku]: cur.price }
        }, {});


        items.map(item => {
            totalOfOrder += formatProductInfo[item.sku] * Number(item.quantity);
        })

        const OrderId = order_id ? order_id : createId("OD-");

        //4. Insert Order
        const insertOrder = await pool.query(`insert into orders (address_id, total, customer_id, id, pay_method) 
        values ($1, $2, $3, $4, $5)`, [AddressId, totalOfOrder, customerId, OrderId, pay_method]);

        //5. Insert to Order Detail
        if (insertOrder.rowCount > 0) {
            items.map(async item => {
                const OrderDetailId = createId("ODD-");
                const total = formatProductInfo[item.sku] * Number(item.quantity);
                await pool.query(`insert into ordersdetail (total, sku, quantity, order_id, id) 
                values ($1, $2, $3, $4, $5)`, [total, item.sku, item.quantity, OrderId, OrderDetailId]);
            })
        }

        return { msg: "Order successful", status: true, orderid: OrderId };
    } catch (error) {
        console.log(error);
        throw error
    }
}

const checkValidQuantity = async (items, productInfo) => {
    try {
        const itemsInOrder = items.map(item => item.sku);
        const { rows } = await pool.query(`select sku, count(sku) as saled_Quantity 
        from ordersdetail group by sku	having sku = ANY($1)`, [itemsInOrder]);
        const saledQuantityInfo = rows;

        const saledQuantityFormat = saledQuantityInfo.reduce((acc, cur) => {
            return { ...acc, [cur.sku]: Number(cur.saled_quantity) }
        }, {});

        const formatProductInfo = productInfo.reduce((acc, cur) => {
            return { ...acc, [cur.sku]: Number(cur.quantity) }
        }, {});

        let engoughQuantity = true;

        items.map(item => {
            if (Number(item.quantity) > formatProductInfo[item.sku] - saledQuantityFormat[item.sku]) {
                engoughQuantity = false;
            }
        })
        return engoughQuantity;

    } catch (error) {
        console.log(error);
        return false
    }
}
const getOrdersByCustomerIdService = async ({ customer_id }) => {
    try {
        const selectOrders = await pool.query(`select address_id, status, total, customer_id, id, createat from orders where customer_id = $1`, [customer_id]);
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

const getOrdersByOrderIdService = async (order_id) => {
    try {
        const selectOrders = await pool.query(`select 
        address_id, status, total, orders.customer_id, orders.createat, orders.id, pay_method, lastname, firstname, phone, email, country, street, distric, wards, city, detail
        from orders join customer on orders.customer_id = customer.id join address on address_id=address.id where orders.id = $1
        order by orders.createat desc `, [order_id]);
        if (selectOrders.rowCount > 0) {
            return { status: true, result: selectOrders.rows[0] };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const deleteOrdersService = async ({ order_id }) => {
    try {
        const orderDetailRowEffect = await pool.query(`delete from ordersdetail where order_id = $1`, [order_id]);
        await pool.query(`delete from orders where id = $1`, [order_id]);
        return { status: true, msg: "Deleted Order" };

    } catch (error) {
        console.log(error);
        throw error
    }
}

// Update is Delete and create new order base on pre order_id
const updateOrderService = async ({ lastname, firstname, email, phone, customer_id, address_id, country, street, distric, wards, city, detail, items, order_id }) => {
    try {

    } catch (error) {

    }
}

const getOrderDetailService = async (order_id) => {
    try {
        const select = await pool.query("select total, sku, quantity, order_id, id, createat from ordersdetail where order_id = $1", [order_id])
        if (select.rowCount > 0) {
            return { status: true, result: select.rows }
        }
        return { status: false, result: [] }


    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = { createOrderService, getOrdersByCustomerIdService, getOrdersByOrderIdService, deleteOrdersService, updateOrderService, getOrderDetailService }