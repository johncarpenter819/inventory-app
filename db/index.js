const { Pool, Query } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports ={
    query: (text, params) => pool.query(text, params),
    pool,
};