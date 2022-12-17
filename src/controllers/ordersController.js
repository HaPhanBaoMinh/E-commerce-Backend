const { createOrderService, getOrdersByCustomerIdService, getOrdersByOrderIdService, deleteOrdersService, updateOrderService, getOrderDetailService } = require("../services/orderService");

const createOrderController = async (req, res) => {
    try {
        console.log(req.body);
        const result = await createOrderService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const readOrderCusIdController = async (req, res) => {
    try {
        const result = await getOrdersByCustomerIdService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const readOrderByIdController = async (req, res) => {
    try {
        const orderId = await req.params.id
        const result = await getOrdersByOrderIdService(orderId);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const deleteOrderController = async (req, res) => {
    try {
        const result = await deleteOrdersService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const updateOrderController = async (req, res) => {
    try {
        const result = await updateOrderService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const readOrderDetailController = async (req, res) => {
    try {
        const orderid = await req.params.id;
        const result = await getOrderDetailService(orderid);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}
module.exports = { createOrderController, readOrderCusIdController, readOrderByIdController, deleteOrderController, updateOrderController, readOrderDetailController }