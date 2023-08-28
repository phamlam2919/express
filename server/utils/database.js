const mysql2 = require("mysql2");

let pool = mysql2
    .createPool({
        host: "localhost",
        user: "root",
        password: "290802",
        database: "db-products",
    })
    .promise();

module.exports = pool;
