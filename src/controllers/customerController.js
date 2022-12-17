const { createCustomerService, getCustomerService, deleteCustomerService, updateCustomerService, loginCustomerService } = require("../services/customerService");

const postCustomerController = async (req, res) => {
    try {
        const result = await createCustomerService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

const readCustomerController = async (req, res) => {
    try {
        const result = await getCustomerService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const loginCustomerController = async (req, res) => {
    try {
        const result = await loginCustomerService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteCustomerController = async (req, res) => {
    try {
        const result = await deleteCustomerService(req.body);
        if (result) {
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const updateCustomerController = async (req, res) => {
    try {
        const result = await updateCustomerService(req.body);
        if (result) {
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { postCustomerController, readCustomerController, deleteCustomerController, updateCustomerController, loginCustomerController }