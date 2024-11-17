const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const util = require('util'); 

const app = express();


app.use(cors());
app.use(bodyParser.json()); 


const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '',      
    database: 'login'  
});


db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database.');
    }
});


db.query = util.promisify(db.query);

// Login API 
app.post('/login', (req, res) => {
    const { userName, password } = req.body;
    const query = 'SELECT * FROM t_login WHERE f_userName = ? AND f_Pwd = ?';
    db.query(query, [userName, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length > 0) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    });
});

// Add Employee API
app.post('/addEmployee', (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    console.log('Received Data:', req.body);

    const query = `INSERT INTO t_employee (f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, mobile, designation, gender, course], (err, results) => {
        if (err) {
            console.error('Database Error:', err); 
            res.status(500).send({ error: 'Error adding employee' });
        } else {
            res.status(200).send({ message: 'Employee added successfully!' });
        }
    });
});

// Get Employees API
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM t_employee ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send({ error: 'Database query failed' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Fetch Employee by ID
app.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await db.query('SELECT * FROM t_employee WHERE f_Id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ message: 'Error fetching employee details' });
    }
});

app.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { f_Name, f_Email, f_Gender, f_Mobile, f_Designation } = req.body;

    try {
       
        const result = await db.query(
            `UPDATE t_employee
            SET f_Name = ?, f_Email = ?, f_Gender = ?, f_Mobile = ?, f_Designation = ?
            WHERE f_Id = ?`,
            [f_Name, f_Email, f_Gender, f_Mobile, f_Designation, id] 
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ message: 'Error updating employee details' });
    }
});

app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM t_employee WHERE f_Id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ message: 'Error deleting employee' });
        }

        if (result.affectedRows > 0) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    });
});

// Server setup
app.listen(5000, () => {
    console.log('Server is running on port 5000.');
});
