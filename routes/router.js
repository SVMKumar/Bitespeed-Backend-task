const express = require('express');

const router = express.Router();

router.get('/identify', (req, res) => {
    res.send("<h1>Sending Response</h1>");
});

module.exports = router;