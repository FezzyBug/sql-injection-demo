const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 4080;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

let db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT, password TEXT)");

    const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run("admin", "admin123");
    stmt.finalize();
});

app.post('/inject', (req, res) => {
    const { query } = req.body;
    console.log('Received query:', query);
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("An error occurred with the executed query:", err.message);
            res.status(500).send(err.message);
        } else {
            res.send(rows);
        }
    });
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
