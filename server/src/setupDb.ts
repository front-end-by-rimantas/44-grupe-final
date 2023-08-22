import mysql, { Connection } from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';

async function setupDb() {
    // Susikuriame DB, jei nera
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    // Susikuriame lenteles
    await usersTable(connection);

    return connection;
}

async function usersTable(db: Connection) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname char(50) COLLATE utf8_swedish_ci NOT NULL,
                        email char(50) COLLATE utf8_swedish_ci NOT NULL,
                        password_hash char(100) COLLATE utf8_swedish_ci NOT NULL,
                        isBlocked tinyint(1) DEFAULT 0 NOT NULL,
                        PRIMARY KEY(id)
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti users lenteles');
        console.log(error);
        throw error;
    }
}

export const connection = await setupDb();