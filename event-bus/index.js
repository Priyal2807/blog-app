const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')


const app = express();
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

const events = [];
app.post('/events', (req, res) => {
    const event = req.body; //anything in the req body is the event
    console.log(event)
    events.push(event);
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err);
    });

    res.send({
        status: 'OK'

    });
})

app.get('/events', (req, res) => {
    res.send(events);
})
app.listen(4005, () => {
    console.log("listening on 4005")
})