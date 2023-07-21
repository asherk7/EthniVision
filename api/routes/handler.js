const express = require('express');
const router = express.Router();

router.get('/male', (req, res, next) => {
    const str = [{
        "name": "John",
        "age": 30
    }];
    res.end(JSON.stringify(str));
});

router.get('/female', (req, res, next) => {
    const str = [{
        "name": "Eve",
        "age": 30
    }];
    res.end(JSON.stringify(str));
});

router.get('/', (req, res, next) => {
    res.end('Hello World!');
});

module.exports = router;
