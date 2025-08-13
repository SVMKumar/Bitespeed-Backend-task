const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

dotenv.config();

connectDB();

app.get('/', (req, res) => {
    res.send("<h1>Sending Response</h1>");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});