const { createAddressService, updateAddressService, deleteAddressService, getAddressService } = require("../services/addressService");

const postAddressController = async (req, res) => {
    try {
        const result = await createAddressService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const updateAddressController = async (req, res) => {
    try {
        const result = await updateAddressService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteAddressController = async (req, res) => {
    try {
        const result = await deleteAddressService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const getAddressController = async (req, res) => {
    try {
        const customerId = await req.params.id
        const result = await getAddressService(customerId);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { postAddressController, updateAddressController, deleteAddressController, getAddressController }