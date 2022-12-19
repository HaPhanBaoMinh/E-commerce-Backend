const { checkAdminAccountService } = require("../services/adminService/accountService");

const authAdmin = async (req, res, next) => {
    const email = req.cookies.email;
    const password = req.cookies.password;

    // console.log(email, password);
    console.log(req.cookies);

    const result = await checkAdminAccountService(email, password);

    if (result) return next()

    if (!result) {
        return res.redirect("http://localhost:3000/login");
    }

}

module.exports = authAdmin 