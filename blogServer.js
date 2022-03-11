const express = require('express');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const bcrypt = require('bcrypt');
const { Router } = require('express');
const { Pool } = require('pg');
app.use(express.json());
app.use(express.static("public"));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.get('/admin', (req, res) => {
    //res.sendFile(`${__dirname}/public/test.html`);
    pool.query('SELECT * FROM posts AND admin;', (err, result) => {
        res.json(result.rows);
    })
})

app.listen(PORT, function() {
    console.log('Server is running on PORT: ' + PORT)
})