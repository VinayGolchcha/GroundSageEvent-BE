import pool from "../../config/db.js";

export const insertImageForShop= (array)=> {
    try{
    let query = `INSERT INTO images (
        type,
        image_url,
        public_id,
        shop_id
    ) VALUES (?,?,?,?);`
    return pool.query(query, array);}
    catch(err){
        console.log("Error in executing in the insertImageForShop:" , err);
        throw(err);
    }
}

export const deleteImageQuery = (array)=> {
    try{
    let query = `DELETE FROM images WHERE public_id = ?`
    return pool.query(query, array);}
    catch(err){
        console.log("Error in executing in the deleteImageQuery:" , err);
        throw(err);
    }
}

export const fetchImagesForShopQuery = (array)=> {
    try{
    let query = `SELECT public_id FROM images WHERE shop_id = ?`
    return pool.query(query, array);}
    catch(err){
        console.log("Error in executing in the fetchImagesForActivity:" , err);
        throw(err);
    }
}


export const fetchImagesBasedOnIdForShopQuery = (array)=> {
    try{
    let query = `SELECT public_id, image_url FROM images WHERE shop_id = ?`
    return pool.query(query, array);}
    catch(err){
        console.log("Error in executing in the fetchImagesBasedOnId:" , err);
        throw(err);
    }
}