const { createAdminAccountService, getAdminAccountService, deleteAdminAccountService, updateAdminAccountService } = require("../../services/adminService/accountService");

const createAdminAccountController = async (req, res) => {
    try {
        const result = await createAdminAccountService({ ...req.body });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const getAdminAccountController = async (req, res) => {
    try {
        const result = await getAdminAccountService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteAdminAccountController = async (req, res) => {
    try {
        const result = await deleteAdminAccountService({ ...req.body });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const updateAdminAccountController = async (req, res) => {
    try {
        const result = await updateAdminAccountService({ ...req.body });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { createAdminAccountController, getAdminAccountController, deleteAdminAccountController, updateAdminAccountController }