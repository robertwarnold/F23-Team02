const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'team02-rds.cobd8enwsupz.us-east-1.rds.amazonaws.com',
  user: 'baath',
  password: 'team02b44th',
  database: 'team02-rds',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/approve', (req, res) => {
  const userId = req.body.userId; // Assuming you send the userId from the frontend
  // Perform database update to set the user status to 'approved'
  const query = 'UPDATE users SET status = ? WHERE id = ?';
  db.query(query, ['approved', userId], (error, results) => {
    if (error) {
      console.error('Error updating user status:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User approved successfully:', results);
      res.status(200).send('User approved successfully');
    }
  });
});

app.post('/deny', (req, res) => {
  const userId = req.body.userId;
  // Perform database update to set the user status to 'denied'
  const query = 'UPDATE users SET status = ? WHERE id = ?';
  db.query(query, ['denied', userId], (error, results) => {
    if (error) {
      console.error('Error updating user status:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User denied successfully:', results);
      res.status(200).send('User denied successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
