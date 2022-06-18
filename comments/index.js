const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {}
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
    console.log(commentsByPostId);
})
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    console.log(req.body)
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status:"pending" });
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status:'pending'
        }
    })
    res.status(201).send(comments);
})
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, status, content, postId } = data;
        const comments = commentsByPostId[postId]
        comments.filter(cmt => cmt.id === id).map(cmt => cmt.status = status);
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,status, postId, content
            }
        })
    }
    res.send({});
})
app.listen(4001, () => {
    console.log('listening on 4001');
})