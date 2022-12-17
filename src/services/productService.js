const pool = require("../config/db/db");
const fs = require('fs');
const createId = require("../utils/createId");

const createProduct = async ({ name, brand, description, category_id, quantity, price, discount_price, day_end_discount, images }) => {
    try {
        const sku = createId('P-');
        const result = await pool.query(`insert into product 
                    (name, brand, description, category_id, quantity, sku, price, discount_price, day_end_discount, images) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [name, brand, description, category_id, quantity, sku, price, discount_price, day_end_discount, images]
        );
        if (result.rowCount > 0) {
            const inserted = await pool.query(`select brand, product.name, images, category.name as category,
            product.description, category_id, quantity, sku, price, createat,
            discount_price, day_end_discount from product join category on category_id = category.id where sku = $1`, [sku])
            return { msg: "Insertd product", status: true, inserted: inserted.rows[0] };
        } else {
            return { msg: "Failed to insert product", status: false, inserted: null };
        }
    } catch (error) {
        console.log(error);
        images?.map(img => {
            const path = `public/${img}`;
            fs.unlink(path, err => {
                if (err) {
                    console.log(err);
                }
            })
        })
        throw error;
    }
}

const getProducts = async () => {
    try {
        const result = await pool.query(`select brand, product.name, images,
                                            product.description, category_id, quantity, sku, price, createat,
                                            discount_price, day_end_discount from product `);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getProductsBysku = async (sku) => {
    try {
        const result = await pool.query(`select brand, product.name, images,
        product.description, category_id, quantity, sku, price, createat,
        discount_price, day_end_discount from product where sku = $1`, [sku]);
        if (result.rowCount > 0) {
            return { status: true, result: result.rows };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteProduct = async (sku) => {
    try {
        //delete images in system
        const selectImagesRows = await pool.query(`select images from product where sku = $1`, [sku]);
        if (selectImagesRows.rowCount > 0) {
            const { images } = selectImagesRows ? selectImagesRows.rows[0] : [];
            images?.map(img => {
                const path = `public/${img}`;
                fs.unlink(path, err => {
                    if (err) {
                        console.log(err);
                    }
                })
            })
        }

        //delete product in DB
        const result = await pool.query(`delete from product where sku = $1`, [sku]);
        if (result.rowCount > 0) {
            return { status: true };
        } else {
            return { status: false };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateProduct = async ({ sku, name, brand, description, category_id, quantity, price, discount_price, day_end_discount, images }) => {
    try {
        //delete img in system
        const selectImagesRows = await pool.query(`select images from product where sku = $1`, [sku]);
        if (selectImagesRows.rowCount > 0) {
            const currentImages = selectImagesRows.rows[0].images;
            const deleteImages = currentImages.filter(n => !images.includes(n))

            if (deleteImages) {
                deleteImages?.map(img => {
                    const path = `public/${img}`;
                    fs.unlink(path, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            }
        }

        const result = await pool.query(`update product set name = $1, brand = $2, description = $3, category_id = $4,
                        quantity = $5, price = $6, discount_price = $7, day_end_discount = $8, images = $9 where sku = $10
                   `, [name, brand, description, category_id, quantity, price, discount_price, day_end_discount, images, sku]
        );
        if (result.rowCount > 0) {
            const inserted = await pool.query(`select brand, product.name, 
            product.description, category_id, quantity, sku, price, createat, images, category.name as category,
                                                discount_price, day_end_discount from product join category on category_id = category.id  where sku = $1`, [sku])
            return { msg: "Updated product", status: true, inserted: inserted.rows[0] };
        } else {
            return { msg: "Failed to updated product", status: false, inserted: null };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getBestSellers = async () => {
    try {
        const result = await pool.query(`select sku 
                from ordersdetail group by sku order by sum(quantity) 
                desc fetch first 4 rows only`);
        if (result.rowCount > 0) {
            const resultFormat = result.rows.reduce((acc, curr) => {
                return [...acc, curr.sku]
            }, []);
            console.log(resultFormat);
            return { status: true, result: resultFormat };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getDiscountProduct = async () => {
    try {
        let today = new Date(Date.now());
        today = today.toLocaleDateString();

        const result = await pool.query(` select brand, name, 
        description, category_id, quantity, sku, price, createat, images,
        discount_price, day_end_discount from product where day_end_discount > $1`, [today]);
        if (result.rowCount > 0) {
            const resultFormat = result.rows.reduce((acc, curr) => {
                return [...acc, curr.sku]
            }, []);
            console.log(resultFormat);
            return { status: true, result: resultFormat };
        } else {
            return { status: false, result: [] };
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createProduct, getProducts, deleteProduct, updateProduct, getBestSellers, getDiscountProduct, getProductsBysku }