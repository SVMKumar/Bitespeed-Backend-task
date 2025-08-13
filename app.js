const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const router = require('./routes/router');

const app = express();

dotenv.config();

connectDB();

app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});