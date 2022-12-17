const { addNewProductToCartService, removeProductFromCartService, getCartService, resetCartService } = require("../services/cartService");

const addNewItemToCartController = async (req, res) => {
    try {
        const result = await addNewProductToCartService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const reomveItemInCartController = async (req, res) => {
    try {
        const result = await removeProductFromCartService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const getCartController = async (req, res) => {
    try {
        const result = await getCartService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const resetCartController = async (req, res) => {
    try {
        const result = await resetCartService(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}


module.exports = { addNewItemToCartController, reomveItemInCartController, getCartController, resetCartController }