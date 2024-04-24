import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import * as tables from './index.js';
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const createTables = async (pool, tables) => {
    await Promise.all(
        tables.map(async (tableQuery) => {
            await pool.query(tableQuery);
        })
    );
};
export const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

export const setupDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');

        const dbCreateQuery = `CREATE DATABASE ${process.env.PG_DATABASE}`;

        await client.query(dbCreateQuery);
        console.log(`Database created: ${process.env.PG_DATABASE}`);

        await client.query(`\c ${process.env.PG_DATABASE}`);

        await createTables(client, tables.default);
        console.log('All tables created');

        client.release();
    } catch (err) {
        console.error(err);
    }
};

export default pool;
