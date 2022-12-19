const { getStoreService, updateStoreService } = require("../services/storeService");

const readStoreController = async (req, res) => {
    try {

        const result = await getStoreService();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}



const updateStoreController = async (req, res) => {
    try {
        let img1 = "";
        let img2 = "";
        const images = req.files.map(file => {
            if (file.originalname === 'img1') {
                img1 = file.filename
            }
            if (file.originalname === 'img2') {
                img2 = file.filename
            }
        })
        const result = await updateStoreService({ ...req.body, img1, img2 });
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false });
    }
}

module.exports = { readStoreController, updateStoreController }