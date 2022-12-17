const { createProduct, getProducts, deleteProduct, updateProduct, getBestSellers, getDiscountProduct, getProductsBysku } = require("../services/productService");

const postProductController = async (req, res) => {
    try {
        const images = await req.files.map(file => file.filename);
        console.log(req.files);
        console.log(images);
        // return { status: true }
        const result = await createProduct({ ...req.body, images });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const readProductsController = async (req, res) => {
    try {
        const result = await getProducts();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const readBestSellersProductsController = async (req, res) => {
    try {
        const result = await getBestSellers();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const readDiscountProductsController = async (req, res) => {
    try {
        const result = await getDiscountProduct();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteProductsController = async (req, res) => {
    try {
        const sku = await req.params.sku;
        const result = await deleteProduct(sku);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

const updateProductController = async (req, res) => {
    try {
        const newImages = req.files.map(file => file.filename);
        let images = req.body.images;
        if (Array.isArray(images)) {
            images = [...req.body.images, ...newImages]
        } else {
            if (req.body.images) {
                images = [req.body.images, ...newImages]
            } else {
                images = [...newImages]
            }
        }
        const result = await updateProduct({ ...req.body, images });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const readProductByskuController = async (req, res) => {
    try {
        const sku = await req.params.sku;
        const result = await getProductsBysku(sku);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { readDiscountProductsController, postProductController, readProductsController, deleteProductsController, updateProductController, readBestSellersProductsController, readProductByskuController }