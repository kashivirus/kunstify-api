
import mysql from "mysql2"

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user:    "admin",
    password: "admin",
    database: "mydatabase",
    port: 3307,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database!");
        connection.release();
    }
});


export default pool.promise()