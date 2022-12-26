const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "1292002",
//     host: "localhost",
//     post: 5432,
//     database: "E-commerce",
// })

const pool = new Pool({
    user: "baominh",
    password: "hq!2H6.PVMyq:5Z",
    host: "postgresql-baominh.alwaysdata.net",
    post: 5432,
    database: "baominh_ecommerce",
})

module.exports = pool;