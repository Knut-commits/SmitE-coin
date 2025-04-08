const express = require('express');
//node.js handling https and web server
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors()); 
//allow cross-origin requests server

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


//CRUD operations
// getting all data from user1 table
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.users1');
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


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM public.users1 WHERE email = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
});
//create is in signup.js

//edit/update is in web page

// remove user (delete)
// document.getElementById('deleteUserBtn').addEventListener('click', () => {
//   // Retrieve the email from the input field
//   const emailToDelete = document.getElementById('deleteEmailInput').value.trim();
  
//   // email validation
//   if (!emailToDelete) {
//     alert("Please enter an email to delete");
//     return;
//   }
  
//   // request delete to API
//   fetch(`http://localhost:3000/users/${encodeURIComponent(emailToDelete)}`, {
//     method: 'DELETE'
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('User deleted:', data);
//     displayOutput(data);
//   })
//   .catch(error => console.error('Error deleting user:', error));
// });

// start server web
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//find at http://localhost:3000/users
//start server using node server.js
// run live-server