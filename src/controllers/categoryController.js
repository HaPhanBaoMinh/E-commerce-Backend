const { createCategory, getCategory, deleteCategory, updateCategory } = require("../services/categoryService");

const postCategoryController = async (req, res) => {
    try {
        const image = req.file.filename;
        const result = await createCategory({ ...req.body, image });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const readCategoryController = async (req, res) => {
    try {
        const result = await getCategory();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const result = await deleteCategory(req.body);
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        let image = await req.body.image;
        if (req.file) {
            const newImages = await req.file.filename
            image = newImages
        }
        // console.log(image);
        const result = await updateCategory({ ...req.body, image });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { postCategoryController, readCategoryController, deleteCategoryController, updateCategoryController }