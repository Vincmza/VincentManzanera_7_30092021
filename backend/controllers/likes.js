const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nehemah@1987",
    database: "db_groupomania",
});

connection.query = promisify(connection.query);

