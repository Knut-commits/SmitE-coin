const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// request
app.use(express.json());

// my postgressql databse connection
const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',
  database: 'postgres',  
  password: '1234',   
  port: 5432,
});

// getting all data
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

// adding user
app.post('/users', async (req, res) => {
  const { email, username, password, balance, image, transaction_count } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users1 (email, username, password, balance, image, transaction_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, username, password, balance, image, transaction_count]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: error.message });
  }
});

// edit/update user
app.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const { username, password, balance, image, transaction_count } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users1 
       SET username = $1, password = $2, balance = $3, image = $4, transaction_count = $5
       WHERE email = $6 RETURNING *`,
      [username, password, balance, image, transaction_count, email]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: error.message });
  }
});

// remove user
app.delete('/users/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query('DELETE FROM users1 WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: error.message });
  }
});

// start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
