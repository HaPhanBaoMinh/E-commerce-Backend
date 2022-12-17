const { getVisitorOnline } = require("../../services/adminService/countVisitorSevice");

const getVisitorOnlineController = async (req, res) => {
    try {
        const result = await getVisitorOnline();
        if (result) {
            return res.json(result);
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: error.detail, status: false })
    }
}

module.exports = { getVisitorOnlineController }