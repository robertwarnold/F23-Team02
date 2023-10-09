const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace these values with your AWS RDS MySQL credentials
const db = mysql.createConnection({
  host: 'your-rds-host',
  user: 'your-rds-username',
  password: 'your-rds-password',
  database: 'your-database-name',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// API endpoint for user registration
app.post('/register', (req, res) => {
  const { firstName, lastName, email, phone, role } = req.body;

  const query = 'INSERT INTO users (firstName, lastName, email, phone, role) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, phone, role], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User registered successfully:', results);
      res.status(200).send('User registered successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
