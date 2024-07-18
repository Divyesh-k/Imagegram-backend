// routes/index.js
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.send('Welcome to my API');
});

module.exports = router;
