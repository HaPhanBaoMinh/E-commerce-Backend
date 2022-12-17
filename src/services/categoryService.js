const fs = require('fs');
const pool = require("../config/db/db");
const createId = require('../utils/createId');

const createCategory = async ({ name, description, image }) => {

    try {
        const id = createId('C-');
        const result = await pool.query(`insert into category 
                    (id, name, description, image) 
                VALUES ($1, $2, $3, $4)`, [id, name, description, image]
        );
        if (result.rowCount > 0) {
            const inserted = await pool.query(`select id, name, description, image from category where id = $1`, [id])
            return { msg: "Insertd category", status: true, inserted: inserted.rows[0] };
        } else {
            return { msg: "Failed to category product", status: false, inserted: null };
        }
    } catch (error) {
        const path = `public/${image}`;
        fs.unlink(path, err => {
            if (err) {
                console.log(err);
            }
        })
        throw error;
    }
}

const getCategory = async () => {
    try {
        const result = await pool.query(`select id, name, description, image from category`);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        throw error;
    }
}

const deleteCategory = async ({ id }) => {
    try {
        const selectImagesRows = await pool.query(`select image from category where id = $1`, [id]);
        if (selectImagesRows.rowCount > 0) {
            const { image } = selectImagesRows ? selectImagesRows.rows[0] : "";
            const path = `public/${image}`;
            fs.unlink(path, err => {
                if (err) {
                    console.log(err);
                }
            })
        }

        const result = await pool.query(`delete from category where id = $1`, [id]);
        if (result.rowCount > 0) {
            return { status: true };
        } else {
            return { status: false };
        }
    } catch (error) {
        throw error;
    }
}

const updateCategory = async ({ id, name, description, image }) => {
    try {
        const selectImagesRows = await pool.query(`select image from category where id = $1`, [id]);
        const currentImages = selectImagesRows.rows[0].image;
        console.log(selectImagesRows);
        // console.log(currentImages);
        if (selectImagesRows.rowCount > 0) {
            if (image !== currentImages) {
                const path = `public/${currentImages}`;
                fs.unlink(path, err => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
        let result = undefined;
        if (image !== currentImages) {
            result = await pool.query(`update category set name = $1, description = $2, image = $3 where id = $4`,
                [name, description, image, id]);
        } else {
            result = await pool.query(`update category set name = $1, description = $2 where id = $3`,
                [name, description, id]);
        }

        if (result.rowCount > 0) {
            const inserted = await pool.query(`select id, name, description, image from category where id = $1`, [id])
            return { msg: "Updated product", status: true, inserted: inserted.rows[0] };
        } else {
            return { msg: "Failed to updated product", status: false, inserted: null };
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { createCategory, getCategory, deleteCategory, updateCategory }