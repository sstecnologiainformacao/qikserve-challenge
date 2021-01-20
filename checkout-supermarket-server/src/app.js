const express = require("express");
const cors = require('cors');
const request = require('request');

const URL = 'http://localhost:8081/products';

const app = express();
app.use(cors());

app.get('/products', (req, resp, next) => {
    request(URL, { json: true }, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        resp.json(body);
    });
});

app.get('/products/:id', (req, resp, next) => {
    request(`${URL}/${req.params.id}`, { json: true }, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        resp.json(body);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});