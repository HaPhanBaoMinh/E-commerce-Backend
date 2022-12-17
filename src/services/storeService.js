const fs = require('fs');
const pool = require("../config/db/db");
const createId = require('../utils/createId');

const getStoreService = async () => {
    try {
        const result = await pool.query(`select facebook, youtube, logo, phone, address, sale_span, title_1, description_1, span_1, img_1, title_2, description_2, span_title_2, span_value_2, span_title_1, span_value_1, img_2
        from store`);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows[0] };
        } else {
            const result = await pool.query(` insert into store values ('')`);
            return { status: true, result: "inserted new" };
        }
    } catch (error) {
        throw error;
    }
}

const updateStoreService = async ({ facebook, youtube, logo, phone, address, sale_span, title_1, description_1, span_1, title_2, description_2, span_title_2, span_value_2, span_title_1, span_value_1, img1, img2 }) => {
    try {
        let span_1Array = span_1;
        if (!Array.isArray(span_1)) {
            span_1Array = [span_1]
        }
        const selectDeleteImg = await pool.query("select img_1, img_2 from store");
        if (selectDeleteImg.rowCount > 0) {
            const img_1 = selectDeleteImg.rows[0].img_1;
            const img_2 = selectDeleteImg.rows[0].img_2;
            const path_1 = `public/${img_1}`;
            const path_2 = `public/${img_2}`;
            if (img1) {
                fs.unlink(path_1, err => {
                    if (err) {
                        console.log(err);
                    }
                })
            } else {
                img1 = img_1;
            }

            if (img2) {
                fs.unlink(path_2, err => {
                    if (err) {
                        console.log(err);
                    }
                })
            } else {
                img2 = img_2;
            }

            // return { facebook, youtube, logo, phone, address, sale_span, title_1, description_1, span_1, title_2, description_2, span_title_2, span_value_2, span_title_1, span_value_1, img }

            const resultUpdate = await pool.query(`update store set 
            facebook = $1, 
            youtube = $2, 
            logo = $3, 
            phone = $4, 
            address = $5, 
            sale_span = $6, 
            title_1 = $7, 
            description_1 = $8, 
            span_1 = $9, 
            title_2 = $10, 
            description_2 = $11, 
            span_title_2 = $12, 
            span_value_2 = $13, 
            span_title_1 = $14, 
            span_value_1 = $15, 
            img_1 = $16,
            img_2 = $17
            `, [facebook, youtube, logo, phone, address, sale_span, title_1, description_1, span_1Array, title_2, description_2, span_title_2, span_value_2, span_title_1, span_value_1, img1, img2]
            );

            if (resultUpdate.rowCount > 0) {
                const inserted = await pool.query(`select facebook, youtube, logo, phone, address, sale_span, title_1, description_1, span_1, title_2, description_2, span_title_2, span_value_2, span_title_1, span_value_1, img_1, img_2 from store`)
                return { msg: "Updated store", status: true, inserted: inserted.rows[0] };
            } else {
                return { msg: "Failed to updated store", status: false, inserted: null };
            }
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = { getStoreService, updateStoreService } 