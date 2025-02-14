const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "surya",
    database: "userdb",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err) => {
        if (err) res.json({ message: "Error" });
        else res.json({ message: "Signup Successful" });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (result.length) res.json({ success: true });
        else res.json({ success: false, message: "Invalid Credentials" });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
