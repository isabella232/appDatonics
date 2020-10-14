const { Pool } = require('pg');

const pool = new Pool({
    connectionString:'postgres://gtlbwyrqfahyhp:b1c81848e049e6070e4467a64eb0806d469416c5060fb165c66193afbfa2d7ba@ec2-52-72-34-184.compute-1.amazonaws.com:5432/d2vfp3ce8endjg',
  ssl: {
    rejectUnauthorized: false
  }
});

const findShop = async(shop) =>{
  
    const query ={
      name:'SearchShop',
      text:`SELECT * FROM shop
      WHERE shop_name LIKE $1`,
      values: [shop]
    }
    
    try {
        const res = await pool.query(query)
        return res.rows;
    } catch (error) {
        return "Error en la consulta";
    }
  }

const insertShop = async(data) =>{
    const query ={
        name:'InsertShop',
        text:`INSERT INTO shop(id_shop, shop_name, shop_tag, shop_url)
        VALUES($1, $2, $3, $4)`,
        values: [data.id_shop, data.shop_name, data.shop_tag, data.shop_url]
      }
  
    try {
      const res = await pool.query(query);
      return {code:201, status: 1, message:'Se guardo correctamente'};
    } catch (error) {
      return {code:400, status: 0, message:'Error al guardar los datos'};
    }
}

const insertDataShop = async(data) =>{
    const query ={
        name:'InsertDataShop',
        text:`INSERT INTO data_shop
        (date_data, id_shop, data)
        VALUES($1, $2, $3)`,
        values: [data.month, 159575, data.data]
      }
  
    try {
      const res = await pool.query(query);
      return {code:201, status: 1, message:'Se guardo correctamente'};
    } catch (error) {
      return {code:400, status: 0, message:'Error al guardar los datos'};
    }
}

const findDataShop = async(data) =>{
    const query ={
        name:'FindDataShop',
        text:`SELECT  * FROM data_shop
        WHERE id_shop = $1`,
        values: [data.id_shop]
      }
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      return {code:400, status: 0, message:'Error al guardar los datos'};
    }
}

const findDataShopMonth = async(data) =>{
    const query ={
        name:'FindDataShopMonth',
        text:`SELECT  * FROM data_shop
        WHERE id_shop = $1 AND date_data LIKE $2`,
        values: [data.id_shop, data.month]
      }
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      return {code:400, status: 0, message:'Error al guardar los datos'};
    }
}


module.exports ={
    findShop,
    insertShop,
    findDataShop,
    insertDataShop,
    findDataShopMonth
  }