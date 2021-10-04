const mysql = require("mysql");
const { promisify } = require("util");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbPassword,
    database: process.env.dbName,
});

connection.query = promisify(connection.query);

module.exports = connection;