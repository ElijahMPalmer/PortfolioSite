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

app.get('/', (req, res) => {
    res.send();
})

app.get('/login/:passkey', async(req, res) => {
    const passkey = req.params.passkey;
    try {
        const hashedPassword = await bcrypt.hash(passkey, 10);
        pool.query('SELECT passkey FROM admin;', async(err, result) => {
            if (await bcrypt.compare(passkey, result.rows[0].passkey)) {
                console.log('success');
                res.send("Success");
            } else {
                console.log('access denied')
                res.send("denied");
            }
        })
    } catch {
        res.status(500);
        res.send();
    }
})

app.get('/blog', (req, res) => {
    pool.query('SELECT content FROM posts;', (err, result) => {
        res.send(result.rows);
    })
})

app.post('/blog', (req, res) => {
    const newBlog = req.body.data;
    console.log(newBlog);
    pool.query("INSERT INTO posts (content) VALUES ($1) RETURNING *;", [newBlog])
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        }).catch((err) => {
            console.log(err)
            res.sendStatus(500);
        })
})


app.listen(PORT, function() {
    console.log('Server is running on PORT: ' + PORT)
})