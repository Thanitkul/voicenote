const mysql = require('mysql2/promise')

async function query(sql, params) {
    try {
        const con = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        const [results, _] = await con.query(sql, params)
        con.end();
        return results
    } catch (error) {
        throw error;
    }
}

module.exports = {
    query
}
