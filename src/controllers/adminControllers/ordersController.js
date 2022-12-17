const { getTotalMonthlyOrderService, getOrdersService, updateOrderStatusService, totalEarningService } = require("../../services/adminService/ordersService");

const getMonthlyOrderAdminController = async (req, res) => {
    try {
        const result = await getTotalMonthlyOrderService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const getOrdersAdminController = async (req, res) => {
    try {
        const result = await getOrdersService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const getTotalEarningAdminController = async (req, res) => {
    try {
        const result = await totalEarningService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const updateOrderAdminController = async (req, res) => {
    try {
        const result = await updateOrderStatusService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}


module.exports = { getMonthlyOrderAdminController, getOrdersAdminController, updateOrderAdminController, getTotalEarningAdminController }  