const pool = require("../../config/db/db");

const increateVisitorOnline = async () => {
    try {
        const newVisitorOnline = await pool.query(`insert into visitorOnline values ($1)`, [new Date()])
        if (newVisitorOnline.rowCount > 0) {
            return { status: true }
        }
        if (newVisitorOnline.rowCount = 0) {
            return { status: false }
        }
    } catch (error) {
        console.log(error);
    }
}

const getVisitorOnline = async () => {
    try {
        const VisitorOnline = await pool.query(`select count(visit_at), EXTRACT(MONTH FROM visit_at) as Month 
        FROM visitoronline  
        WHERE EXTRACT(YEAR FROM visit_at) = $1 and EXTRACT(month FROM visit_at) = $2 or EXTRACT(month FROM visit_at) = $3 
        GROUP BY EXTRACT(MONTH FROM visit_at), EXTRACT(year FROM visit_at)`, [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getMonth()])

        if (VisitorOnline.rowCount > 0) {
            return { status: true, result: VisitorOnline.rows }
        }
        if (VisitorOnline.rowCount = 0) {
            return { status: false, result: [] }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { increateVisitorOnline, getVisitorOnline }

// SELECT count(id), EXTRACT(MONTH FROM createat) as Month FROM orders
//         WHERE EXTRACT(YEAR FROM createat) = $1 group by EXTRACT(MONTH FROM createat), EXTRACT(year FROM createat)