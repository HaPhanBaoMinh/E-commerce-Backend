const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser')


//middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "false" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(morgan("tiny"));
app.use(cookieParser())

app.get("/get-cookie", async (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies)
})
//import routes
const { productRouter } = require('./src/routes/productsRouter');
const { categoryRouter } = require('./src/routes/categoryRouter');
const { customerRouter } = require('./src/routes/customerRouter');
const { cartRouter } = require('./src/routes/cartRouter');
const { addressRouter } = require('./src/routes/addressRouter');
const { orderRouter } = require('./src/routes/orderRouter');
const { storeRouter } = require('./src/routes/storeRouter');
const { orderAdminRouter } = require('./src/routes/adminRoutes/orderRouter');
const socket = require("socket.io");
const { createOrderService, getOrdersByOrderIdService } = require('./src/services/orderService');
const { increateVisitorOnline } = require('./src/services/adminService/countVisitorSevice');
const { visitorAdminRouter } = require('./src/routes/adminRoutes/visitorRouter');
const { adminAccountRouter } = require('./src/routes/adminRoutes/adminAccountRouter');
const { todolistRouter } = require('./src/routes/adminRoutes/todolistRouter');

//routes
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/customer", customerRouter);
app.use("/api/cart", cartRouter);
app.use("/api/store", storeRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/images", express.static("public"))

app.use("/api/admin/orders", orderAdminRouter);
app.use("/api/admin/visitor", visitorAdminRouter);
app.use("/api/admin/account", adminAccountRouter);
app.use("/api/admin/todolist", todolistRouter);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server start on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001", 'https://e-commerce-6nf9.onrender.com', 'https://ecommerce-admin-y963.onrender.com', 'https://e-commerce-admin-frontend.vercel.app'],
        Credential: true,
    },
});

let adminId = '';
io.on("connection", (socket) => {
    socket.on("admin-connection", ({ id }) => {
        adminId = socket.id
    })
    // console.log(admin);
    socket.on("add-new-order", async (body) => {
        if (true) {
            const newOrder = await createOrderService(body);
            const order = await getOrdersByOrderIdService(newOrder.orderid)
            await socket.to(adminId).emit("new-order-recieve", order);
        }
    });
    socket.on("new-vitsitor", async () => {
        const result = await increateVisitorOnline();
        if (result.status) {
            await socket.to(adminId).emit("new-vitsitor-recieve", result);
        }
    })
})

