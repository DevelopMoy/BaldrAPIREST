const mysql = require('mysql2');

const getConnectionDB = ()=>{
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE_NAME
    });
}

module.exports = {
    getConnectionDB
}
