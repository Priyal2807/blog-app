const express = require("express");
const { RandomBytes } = require("crypto");
const { randomBytes } = require("node:crypto");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const posts = {};

//methods
app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
})

app.listen(4000, () => {
    console.log("listening at 4000");
});