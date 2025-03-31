const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

//my own postgresql connection
const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',
  database: 'postgres',  
  password: '1234',  
  port: 5432,              
});

// api endpoint
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// start the serer
