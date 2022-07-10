//Pool of all the athrev-ed db accesses
console.log("inside dg - config 1");
const { Pool } = require("pg");

 const config = {
     host: 'localhost',
     port: '5432',
     database: 'Cricketproject',
     user: 'postgres',
     password: 'Suhant@18'
 };
 const pool = new Pool(config);

module.exports = pool;