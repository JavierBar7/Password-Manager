const { Pool } = require('pg');
require('dotenv').config();

const url = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: typeof url === 'string' ? url : String(url), 
});

module.exports = pool;