const express = require("express");
const { randomBytes } = require("node:crypto");
const bodyParser = require("body-parser");
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
const posts = {};

//methods
app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    console.log(posts);
    await axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data: {
            id, title
        }
    }).catch((err) => {console.log(err)});
    res.status(201).send(posts[id]);
})
app.post('/events', (req, res) => {
    console.log("received event", req.body.type);
    res.send({});
})
app.listen(4000, () => {
    console.log("listening at 4000");
});